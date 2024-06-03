import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ReportsSlice, FlatsPerMnagaer, ReportInterval } from './types'
import customActions from './actions'
import { GroupedData } from '@/utils/reports'
import { Enlonado } from '../enlonados/types'

const initialState: ReportsSlice = {
	flats_per_manager: {
		users: [],
		weeksNumber: [],
		enlonados: { simple: 0, full: 0, data: [] },
		interval: { start: null, end: null },
		groupedData: {
			totalsByWeek: {},
			finalTotal: { value: 0 }
		} as GroupedData
	},
	loading: false
}

const reports = createSlice({
	name: 'reports',
	initialState,
	reducers: {
		resetSlice: () => initialState,
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setFlatsPerManager(state, action: PayloadAction<Partial<FlatsPerMnagaer>>) {
			state.flats_per_manager = { ...state.flats_per_manager, ...action.payload }
		},
		setGroupedData(state, action: PayloadAction<GroupedData>) {
			state.flats_per_manager.groupedData = action.payload
		},
		setIntervals(state, action: PayloadAction<Partial<ReportInterval>>) {
			state.flats_per_manager.interval = { ...state.flats_per_manager.interval, ...action.payload }
		},
		setEnlonadosData(state, action: PayloadAction<Enlonado[]>) {
			state.flats_per_manager = {
				...state.flats_per_manager,
				enlonados: { ...state?.flats_per_manager?.enlonados, data: action.payload }
			}
		}
	}
})

export const reportsActions = { ...reports.actions, ...customActions }

export default reports.reducer
