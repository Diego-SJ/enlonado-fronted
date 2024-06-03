import { Dayjs } from 'dayjs'
import { Company } from '../companies/types'
import { Team, TeamMembers, User } from '../users/types'

export type EnlonadosSlice = {
	enlonados: Enlonado[]
	pagination: {
		page: number
		pageSize: number
		total: number
	}
	enlonado: Enlonado
	loading: boolean
}

export const ENLONDADO_STATUS = {
	PENDING: 'PENDING',
	COMPLETED: 'COMPLETED',
	CANCELED: 'CANCELED'
}

export const ENLONADO_PAYMENT_METHOD = {
	CASH: 'CASH',
	CREDIT: 'CREDIT',
	TRANSFER: 'TRANSFER',
	PENDING: 'PENDING'
}

export const PAYMENT_METHOD_TEXT = {
	[ENLONADO_PAYMENT_METHOD.CASH]: 'Efectivo',
	[ENLONADO_PAYMENT_METHOD.CREDIT]: 'Crédito',
	[ENLONADO_PAYMENT_METHOD.TRANSFER]: 'Transferencia',
	[ENLONADO_PAYMENT_METHOD.PENDING]: 'Pendiente'
}

export const FLAT_TYPE = {
	SIMPLE: 'SIMPLE',
	FULL: 'FULL'
}

export const FLAT_TYPE_TEXT = {
	[FLAT_TYPE.SIMPLE]: 'Sencilla',
	[FLAT_TYPE.FULL]: 'Full'
}

export const FlatValue = {
	[FLAT_TYPE.SIMPLE]: 1,
	[FLAT_TYPE.FULL]: 2
}

export type EnlonadoPaymentMethod =
	(typeof ENLONADO_PAYMENT_METHOD)[keyof typeof ENLONADO_PAYMENT_METHOD]

export type EnlonadoFlatType = (typeof FLAT_TYPE)[keyof typeof FLAT_TYPE]

export type Enlonado = {
	enlonado_id: string
	created_at: Date | string
	folio: string
	date?: Dayjs | string
	start_time?: Dayjs | string
	end_time?: Dayjs | string
	plate?: string
	flat_type?: EnlonadoFlatType
	flat_1?: string
	flat_2?: string
	driver_name?: string
	payment_method?: EnlonadoPaymentMethod
	status?: string
	team_members?: TeamMembers
	time_per_flat?: number
	used_credits?: number
	comments?: string

	company_id?: string
	companies?: Company

	manager_id?: string
	users?: User

	team_id?: string
	teams?: Team
}

export type EnlonadosFilterOptions = {
	manager_id?: string | null
	start_date?: string | null
	end_date?: string | null
	flat_type?: string | null
	payment_method?: string | null
	company_id?: string | null
	folio?: string | null
	plate?: string | null
	page?: number
	pageSize?: number
}
