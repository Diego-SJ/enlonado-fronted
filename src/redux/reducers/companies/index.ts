import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CompaniesSlice, Company } from './types'
import customActions from './actions'

const initialState: CompaniesSlice = {
	companies: [],
	loading: false
}

const companies = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		resetSlice: () => initialState,
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setCompanies(state, action: PayloadAction<Company[]>) {
			state.companies = action.payload
		}
	}
})

export const companyActions = { ...companies.actions, ...customActions }

export default companies.reducer
