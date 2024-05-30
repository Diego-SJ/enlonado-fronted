export type CompaniesSlice = {
	companies: Company[]
	loading: boolean
}

export type Company = {
	company_id: string
	created_at: Date | string
	name: string
	description?: string
	is_active: boolean
	phone?: string
}
