import { GroupedData } from '@/utils/reports'
import { User } from '../users/types'
import { Dayjs } from 'dayjs'
import { Enlonado } from '../enlonados/types'

export type ReportsSlice = {
	flats_per_manager: FlatsPerMnagaer
	loading: boolean
}

export type FlatsPerMnagaer = {
	users?: User[]
	enlonados?: { simple?: number; full?: number; data?: Enlonado[] }
	weeksNumber?: number[]
	groupedData?: GroupedData
	interval?: ReportInterval
}

export type ReportInterval = {
	start?: Dayjs | null
	end?: Dayjs | null
}
