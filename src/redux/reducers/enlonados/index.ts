import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Enlonado, EnlonadosSlice } from './types'
import customActions from './actions'

const initialState: EnlonadosSlice = {
	enlonados: [],
	enlonado: {} as Enlonado,
	loading: false,
	pagination: {
		page: 1,
		pageSize: 20,
		total: 0
	}
}

const enlonados = createSlice({
	name: 'enlonados',
	initialState,
	reducers: {
		resetSlice: () => initialState,
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setEnlonados(state, action: PayloadAction<Enlonado[]>) {
			state.enlonados = action.payload
		},
		setEnlonado(state, action: PayloadAction<Enlonado>) {
			state.enlonado = action.payload
		},
		setPagination(state, action: PayloadAction<{ page: number; pageSize: number; total: number }>) {
			state.pagination = action.payload
		}
	}
})

export const enlonadosActions = { ...enlonados.actions, ...customActions }

export default enlonados.reducer
