export type CompaniesSlice = {
	companies: Company[]
	company: Company
	loading: boolean
}

export type Company = {
	company_id: string
	created_at: Date | string
	name: string
	description?: string
	is_active: boolean
	phone?: string
	payment_method?: string
	social_reason?: string
	contact_info?: CompanyContactInfo
}

export type CompanyContactInfo = {
	phones?: { id?: number; name?: string; value?: string }[]
	emails?: { id?: number; name?: string; value?: string }[]
}
