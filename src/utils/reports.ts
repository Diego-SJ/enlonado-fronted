import { Enlonado } from '@/redux/reducers/enlonados/types'
import { User } from '@/redux/reducers/users/types'

interface WeekData {
	cash: number
	credits: number
	total: number
}

export type GroupedData = {
	finalTotal: {
		value: number
		cash?: number
		credits?: number
	}
	totalsByWeek: {
		[week: number]: WeekData
	}
	[managerId: string]: {
		[week: number]: WeekData
		totalCash?: number
		totalCredits?: number
		total?: number
	}
}

export const reports = {
	flatsByManager: {
		getWeekNumber: function (date: Date | string): number {
			const _date = new Date(date)
			const firstDayOfYear = new Date(_date.getFullYear(), 0, 1)
			const pastDaysOfYear = (_date.getTime() - firstDayOfYear.getTime()) / 86400000
			return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
		},
		groupData: (data: Enlonado[], users: User[]): GroupedData => {
			const groupedData: GroupedData = {
				totalsByWeek: {},
				finalTotal: { value: 0, cash: 0, credits: 0 }
			} as GroupedData

			const userIds = new Set(users.map((user) => user.user_id))

			data.forEach((enlonado) => {
				const week = reports.flatsByManager.getWeekNumber(new Date(enlonado.date as string))
				const managerId: string = enlonado.manager_id as string

				if (!userIds.has(managerId)) {
					return
				}

				if (!groupedData[managerId]) {
					groupedData[managerId] = {}
				}
				if (!groupedData[managerId][week]) {
					groupedData[managerId][week] = { cash: 0, credits: 0, total: 0 }
				}
				if (!groupedData[managerId].totalCash) {
					groupedData[managerId].totalCash = 0
				}
				if (!groupedData[managerId].totalCredits) {
					groupedData[managerId].totalCredits = 0
				}
				if (!groupedData[managerId].total) {
					groupedData[managerId].total = 0
				}
				if (!groupedData.totalsByWeek[week]) {
					groupedData.totalsByWeek[week] = { cash: 0, credits: 0, total: 0 }
				}

				const flatValue = enlonado.flat_type === 'FULL' ? 2 : 1
				if (['CASH', 'TRANSFER', 'PENDING'].includes(enlonado.payment_method as string)) {
					groupedData[managerId][week].cash += flatValue
					groupedData.totalsByWeek[week].cash += flatValue
					groupedData[managerId].totalCash! += flatValue
					groupedData.finalTotal.cash! += flatValue
				}
				if (enlonado.payment_method === 'CREDIT') {
					groupedData[managerId][week].credits += flatValue
					groupedData.totalsByWeek[week].credits += flatValue
					groupedData[managerId].totalCredits! += flatValue
					groupedData.finalTotal.credits! += flatValue
				}
				groupedData[managerId][week].total =
					groupedData[managerId][week].cash + groupedData[managerId][week].credits

				groupedData.totalsByWeek[week].total =
					groupedData.totalsByWeek[week].cash + groupedData.totalsByWeek[week].credits

				groupedData[managerId].total =
					groupedData[managerId].totalCash! + groupedData[managerId].totalCredits!
				groupedData.finalTotal.value += flatValue
			})

			return groupedData
		}
	}
}
