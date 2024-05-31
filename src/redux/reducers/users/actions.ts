import { AppDispatch, AppState } from '@/redux/store'
import { userActions } from '.'
import { supabase } from '@/services/supabase'
import { SUPABASE_PASSWORD, SUPABASE_USERNAME } from '@/constants/credentials'
import { Team, User } from './types'
import { companyActions } from '../companies'
import { enlonadosActions } from '../enlonados'

const customActions = {
	login:
		(username: string, password: string) => async (dispatch: AppDispatch, getState: AppState) => {
			dispatch(userActions.setLoading(true))
			const { user_auth = {} } = getState()?.users

			if (!user_auth?.session?.access_token) {
				const { data, error } = await supabase.auth.signInWithPassword({
					email: SUPABASE_USERNAME,
					password: SUPABASE_PASSWORD
				})

				await dispatch(userActions.setUserAuth({ session: data?.session }))

				if (error) {
					dispatch(userActions.setLoading(false))
					return false
				}
			}

			let {
				data: [users],
				error: userError
			} = await supabase
				.from('users')
				.select('*')

				// Filters
				.eq('username', username)
				.eq('password', password)

			if (userError) {
				dispatch(userActions.setLoading(false))
				return false
			}

			dispatch(userActions.setUserAuth({ user: { ...users, is_admin: users?.role === 'ADMIN' } }))
			await dispatch(companyActions.fetchCompanies())
			await dispatch(userActions.fetchUsers())
			await dispatch(userActions.fetchTeams())
			dispatch(userActions.setIsLogged(true))
			dispatch(userActions.setLoading(false))
			return true
		},
	signOut: () => async (dispatch: AppDispatch) => {
		await supabase.auth.signOut()
		dispatch(userActions.setIsLogged(false))
		dispatch(userActions.resetSlice())
		dispatch(companyActions.resetSlice())
		dispatch(enlonadosActions.resetSlice())
	},
	fetchUsers: () => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))
		const { data, error } = await supabase.from('users').select('*').eq('is_active', true)

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		dispatch(userActions.setUsers(data))
		dispatch(userActions.setLoading(false))
		return true
	},
	createUser: (data: Partial<User>, user_id?: string | null) => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))
		let error = null
		if (user_id) {
			const { error: updateError } = await supabase
				.from('users')
				.update(data)
				.eq('user_id', user_id)
			error = updateError
		} else {
			const { error: insertError } = await supabase.from('users').insert(data)
			error = insertError
		}

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		await dispatch(userActions.fetchUsers())
		dispatch(userActions.setLoading(false))
		return true
	},
	deleteUser: (user_id: string) => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))
		const { error } = await supabase.from('users').delete().eq('user_id', user_id)

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		await dispatch(userActions.fetchUsers())
		dispatch(userActions.setLoading(false))
		return true
	},
	updateUserProfile:
		(data: Partial<User>, user_id?: string | null) => async (dispatch: AppDispatch) => {
			dispatch(userActions.setLoading(true))
			let error = null
			let newUser = null
			if (user_id) {
				const { error: updateError, data: user } = await supabase
					.from('users')
					.update(data)
					.eq('user_id', user_id)
					.select()
					.single()
				error = updateError
				newUser = user
			}

			if (error) {
				dispatch(userActions.setLoading(false))
				return false
			}

			dispatch(userActions.setUserAuth({ user: newUser as User }))
			dispatch(userActions.setLoading(false))
			return true
		},
	changeStatusUser: (user_id: string, status: boolean) => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))

		const { error } = await supabase
			.from('users')
			.update({ is_active: status })
			.eq('user_id', user_id)

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		await dispatch(userActions.fetchUsers())
		return true
	},
	fetchTeams: () => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))
		const { data, error } = await supabase
			.from('teams')
			.select('*, users (user_id, name, surnames)')
			.eq('is_active', true)

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		dispatch(userActions.setTeams(data))
		dispatch(userActions.setLoading(false))
		return true
	},
	fetchTeamByManagerId: async (manager_id: string): Promise<Team | null> => {
		const { data, error } = await supabase
			.from('teams')
			.select('*, users (user_id, name, surnames)')
			.eq('manager_id', manager_id)

		if (error) {
			return null
		}

		return data[0] as Team
	},
	createTeam: (data: Partial<Team>, team_id?: string | null) => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))
		let error = null
		let payload: Partial<Team> = {
			name: data.name,
			manager_id: data.manager_id,
			team_members: data.team_members,
			is_active: data.is_active ?? true
		}
		if (team_id) {
			const { error: updateError } = await supabase
				.from('teams')
				.update(payload)
				.eq('team_id', team_id)
			error = updateError
		} else {
			const { error: insertError } = await supabase.from('teams').insert(payload)
			error = insertError
		}

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		await dispatch(userActions.fetchTeams())
		return true
	},
	changeStatusTeam: (team_id: string, status: boolean) => async (dispatch: AppDispatch) => {
		dispatch(userActions.setLoading(true))

		const { error } = await supabase
			.from('teams')
			.update({ is_active: status })
			.eq('team_id', team_id)

		if (error) {
			dispatch(userActions.setLoading(false))
			return false
		}

		await dispatch(userActions.fetchTeams())
		return true
	}
}

export default customActions
