import { AppDispatch, AppState } from '@/redux/store'
import { enlonadosActions } from '.'
import { supabase } from '@/services/supabase'
import { Enlonado, EnlonadosFilterOptions } from './types'
import { userActions } from '../users'
import { enlonados } from '@/utils/enlonados'

const customActions = {
	fetchEnlonados:
		(filters?: EnlonadosFilterOptions) => async (dispatch: AppDispatch, getState: AppState) => {
			dispatch(enlonadosActions.setLoading(true))
			const user = getState().users?.user_auth?.user

			let query = supabase
				.from('enlonados')
				.select('*, users(name,surnames), companies(name)', { count: 'exact' })

			if (!user?.is_admin) {
				query.eq('manager_id', user?.user_id)
			}

			if (filters) {
				if (filters.manager_id) query = query.eq('manager_id', filters.manager_id)
				if (filters.start_date) query = query.gte('date', filters.start_date)
				if (filters.end_date) query = query.lte('date', filters.end_date)
				if (filters.flat_type) query = query.eq('flat_type', filters.flat_type)
				if (filters.payment_method) query = query.eq('payment_method', filters.payment_method)
				if (filters.company_id) query = query.eq('company_id', filters.company_id)
				if (filters.folio) query = query.ilike('folio', `%${filters.folio}%`)
				if (filters.plate) query = query.ilike('plate', `%${filters.plate}%`)
			}

			if (filters?.sort && filters?.field) {
				query.order(filters?.field, { ascending: filters?.sort === 'asc' })
			} else {
				query.order('date', { ascending: false })
			}

			console.log(filters)

			const page = filters?.page || 0
			const pageSize = 20
			let offset = page * pageSize
			let limit = (page + 1) * pageSize - 1

			const { data, error, count } = await query.range(offset, limit)

			if (error) {
				dispatch(enlonadosActions.setLoading(false))
				return false
			}

			dispatch(
				enlonadosActions.setPagination({
					page: filters?.page as number,
					pageSize,
					total: count || 0
				})
			)
			dispatch(enlonadosActions.setEnlonados(data))
			dispatch(enlonadosActions.setLoading(false))
			return true
		},

	fetchEnlonadosCSV:
		(filters?: EnlonadosFilterOptions) => async (dispatch: AppDispatch, getState: AppState) => {
			dispatch(enlonadosActions.setLoading(true))
			const user = getState().users?.user_auth?.user
			const limitRecords = getState().enlonados?.pagination?.total || 0

			let query = supabase.from('enlonados').select('*, users(name), teams(name), companies(name)')

			if (!user?.is_admin) {
				query.eq('manager_id', user?.user_id)
			}

			if (filters) {
				if (filters.manager_id) query = query.eq('manager_id', filters.manager_id)
				if (filters.start_date) query = query.gte('date', filters.start_date)
				if (filters.end_date) query = query.lte('date', filters.end_date)
				if (filters.flat_type) query = query.eq('flat_type', filters.flat_type)
				if (filters.payment_method) query = query.eq('payment_method', filters.payment_method)
				if (filters.company_id) query = query.eq('company_id', filters.company_id)
				if (filters.folio) query = query.ilike('folio', `%${filters.folio}%`)
				if (filters.plate) query = query.ilike('plate', `%${filters.plate}%`)
			}

			let offset = 0
			let limit = limitRecords

			const { data, error } = await query
				.order('created_at', { ascending: false })
				.range(offset, limit)

			if (error) {
				dispatch(enlonadosActions.setLoading(false))
				return false
			}

			await enlonados.downloadCsv(data!)
			dispatch(enlonadosActions.setLoading(false))
			return true
		},
	createEnlonado:
		(data: Partial<Enlonado>, enlonado_id?: string | null) =>
		async (dispatch: AppDispatch, getState: AppState) => {
			dispatch(enlonadosActions.setLoading(true))

			let error = null
			let payload: Partial<Enlonado> = {
				folio: data?.folio?.toUpperCase() || '',
				date: data.date,
				start_time: data.start_time,
				time_per_flat: data.time_per_flat,
				end_time: data.end_time,
				plate: data?.plate?.toUpperCase() || '',
				flat_type: data.flat_type,
				flat_1: data?.flat_1?.toUpperCase() || '',
				flat_2: data?.flat_2?.toUpperCase() || '',
				driver_name: data?.driver_name?.toUpperCase() || '',
				payment_method: data.payment_method,
				status: data.status,
				used_credits: data.used_credits,
				comments: data.comments,
				company_id: data.company_id
			}

			if (enlonado_id) {
				const { error: updateError } = await supabase
					.from('enlonados')
					.update(payload)
					.eq('enlonado_id', enlonado_id)
				error = updateError
			} else {
				let manager_id = getState().users?.user_auth?.user?.user_id
				let team = await userActions.fetchTeamByManagerId(manager_id!)

				const { error: insertError } = await supabase.from('enlonados').insert({
					...payload,
					team_members: team?.team_members,
					manager_id: manager_id,
					team_id: team?.team_id
				})
				error = insertError
			}

			if (error) {
				dispatch(enlonadosActions.setLoading(false))
				return false
			}

			if (enlonado_id) {
				await dispatch(enlonadosActions.fetchEnlonadoById(enlonado_id))
				return true
			}

			dispatch(enlonadosActions.setLoading(false))
			return true
		},
	deleteEnlonado: (enlonado_id: string) => async (dispatch: AppDispatch) => {
		dispatch(enlonadosActions.setLoading(true))
		const { error } = await supabase.from('enlonados').delete().eq('enlonado_id', enlonado_id)

		if (error) {
			dispatch(enlonadosActions.setLoading(false))
			return false
		}

		return true
	},
	fetchEnlonadoById: (enlonado_id: string) => async (dispatch: AppDispatch) => {
		dispatch(enlonadosActions.setLoading(true))
		const { data, error } = await supabase
			.from('enlonados')
			.select('*, users(name), companies(name), teams(name)')
			.eq('enlonado_id', enlonado_id)

		if (error) {
			dispatch(enlonadosActions.setLoading(false))
			return false
		}

		dispatch(enlonadosActions.setEnlonado(data![0]))
		dispatch(enlonadosActions.setLoading(false))
		return true
	}
}

export default customActions
