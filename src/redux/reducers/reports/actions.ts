import { AppDispatch, AppState } from '@/redux/store'
import { ReportInterval } from './types'
import { reportsActions } from '.'
import { dates } from '@/utils/dates'
import { reports } from '@/utils/reports'
import { supabase } from '@/services/supabase'

const customActions = {
	handleWeeks:
		(data: Partial<ReportInterval>) => async (dispatch: AppDispatch, getState: AppState) => {
			await dispatch(reportsActions.setIntervals(data))
			const { start, end } = getState().reports?.flats_per_manager?.interval as ReportInterval
			const users = getState().reports?.flats_per_manager?.users || []

			if (!start || !end) {
				return false
			}

			dispatch(reportsActions.setLoading(true))

			const { interval } = getState().reports?.flats_per_manager

			const { data: enlonados, error } = await supabase
				.from('enlonados')
				.select('*')
				.gte('date', interval?.start)
				.lte('date', interval?.end)

			if (error) {
				dispatch(reportsActions.setLoading(false))
				return false
			}

			await dispatch(reportsActions.setEnlonadosData(enlonados))

			const selectedManagers = reports.flatsByManager.groupData(enlonados, users)
			await dispatch(reportsActions.setGroupedData(selectedManagers))

			let weeksNumber: number[] = []
			weeksNumber = dates.getWeeksIds(interval?.start, interval?.end)
			await dispatch(reportsActions.setFlatsPerManager({ weeksNumber }))
			dispatch(reportsActions.setLoading(false))
		},

	flatsByManagerReport: () => async (dispatch: AppDispatch, getState: AppState) => {
		const enlonados = getState().reports?.flats_per_manager?.enlonados?.data || []
		const users = getState().reports?.flats_per_manager?.users || []
		const selectedManagers = reports.flatsByManager.groupData(enlonados, users)
		dispatch(reportsActions.setGroupedData(selectedManagers))
	},
	getEnlonadosTotals: () => async (dispatch: AppDispatch) => {
		let { data, error } = await supabase.rpc('get_enlonados_totals').single()

		if (error) {
			return false
		}

		dispatch(
			reportsActions.setFlatsPerManager({
				enlonados: { simple: data?.simple_total || 0, full: data?.full_total || 0 }
			})
		)
	}
}

export default customActions
