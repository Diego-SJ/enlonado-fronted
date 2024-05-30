import { AppDispatch } from '@/redux/store'
import { companyActions } from '.'
import { supabase } from '@/services/supabase'
import { Company } from './types'

const customActions = {
	fetchCompanies: () => async (dispatch: AppDispatch) => {
		dispatch(companyActions.setLoading(true))
		const { data, error } = await supabase.from('companies').select('*').eq('is_active', true)

		if (error) {
			dispatch(companyActions.setLoading(false))
			return false
		}

		dispatch(companyActions.setCompanies(data))
		dispatch(companyActions.setLoading(false))
		return true
	},
	createCompany:
		(data: Partial<Company>, company_id?: string | null) => async (dispatch: AppDispatch) => {
			dispatch(companyActions.setLoading(true))
			let error = null
			let payload: Partial<Company> = {
				name: data.name,
				description: data.description,
				phone: data.phone,
				is_active: data.is_active ?? true
			}
			if (company_id) {
				const { error: updateError } = await supabase
					.from('companies')
					.update(payload)
					.eq('company_id', company_id)
				error = updateError
			} else {
				const { error: insertError } = await supabase.from('companies').insert(payload)
				error = insertError
			}

			if (error) {
				dispatch(companyActions.setLoading(false))
				return false
			}

			await dispatch(companyActions.fetchCompanies())
			return true
		},
	changeStatusCompany: (company_id: string, status: boolean) => async (dispatch: AppDispatch) => {
		dispatch(companyActions.setLoading(true))

		const { error } = await supabase
			.from('companies')
			.update({ is_active: status })
			.eq('company_id', company_id)

		if (error) {
			dispatch(companyActions.setLoading(false))
			return false
		}

		await dispatch(companyActions.fetchCompanies())
		return true
	}
}

export default customActions
