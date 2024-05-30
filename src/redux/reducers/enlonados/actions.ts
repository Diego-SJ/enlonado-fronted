import { AppDispatch, AppState } from '@/redux/store'
import { enlonadosActions } from '.'
import { supabase } from '@/services/supabase'
import { Enlonado } from './types'
import { userActions } from '../users'

const customActions = {
	fetchEnlonados: () => async (dispatch: AppDispatch) => {
		dispatch(enlonadosActions.setLoading(true))
		const { data, error } = await supabase.from('enlonados').select('*, users(*)')

		if (error) {
			dispatch(enlonadosActions.setLoading(false))
			return false
		}

		dispatch(enlonadosActions.setEnlonados(data))
		dispatch(enlonadosActions.setLoading(false))
		return true
	},
	createEnlonado:
		(data: Partial<Enlonado>, enlonado_id?: string | null) =>
		async (dispatch: AppDispatch, getState: AppState) => {
			dispatch(enlonadosActions.setLoading(true))
			let manager_id = getState().users?.user_auth?.user?.user_id
			let team = await userActions.fetchTeamByManagerId(manager_id!)

			let error = null
			let payload: Partial<Enlonado> = {
				folio: data.folio,
				date: data.date,
				start_time: data.start_time,
				time_per_flat: data.time_per_flat,
				end_time: data.end_time,
				plate: data.plate,
				flat_type: data.flat_type,
				flat_1: data.flat_1,
				flat_2: data.flat_2,
				driver_name: data.driver_name,
				payment_method: data.payment_method,
				status: data.status,
				team_members: team?.team_members,
				used_credits: data.used_credits,
				comments: data.comments,

				company_id: data.company_id,
				manager_id: manager_id,
				team_id: team?.team_id
			}

			if (enlonado_id) {
				const { error: updateError } = await supabase
					.from('enlonados')
					.update(payload)
					.eq('enlonado_id', enlonado_id)
				error = updateError
			} else {
				const { error: insertError } = await supabase.from('enlonados').insert(payload)
				error = insertError
			}

			if (error) {
				dispatch(enlonadosActions.setLoading(false))
				return false
			}

			await dispatch(enlonadosActions.fetchEnlonados())
			return true
		},
	deleteEnlonado: (enlonado_id: string) => async (dispatch: AppDispatch) => {
		dispatch(enlonadosActions.setLoading(true))
		const { error } = await supabase.from('enlonados').delete().eq('enlonado_id', enlonado_id)

		if (error) {
			dispatch(enlonadosActions.setLoading(false))
			return false
		}

		await dispatch(enlonadosActions.fetchEnlonados())
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
