import { Card, Grid, TextField } from '@mui/material'
import CompaniesDataGrid from './companies-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'

import functions from '@/utils/functions'
import { useDebounce } from '@uidotdev/usehooks'
import { Company } from '@/redux/reducers/companies/types'
import { companyActions } from '@/redux/reducers/companies'

const CompaniesPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { companies: data = [] } = useAppSelector((state) => state.companies)
	const [companies, setCompanies] = useState<Company[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const firstRender = useRef(false)
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(companyActions.fetchCompanies())
		}
	}, [dispatch, firstRender])

	useEffect(() => {
		if (data?.length > 0 && !!debouncedSearchTerm) {
			const filtered = data?.filter(
				(user) =>
					functions.includes(user.name, debouncedSearchTerm) ||
					functions.includes(user.description, debouncedSearchTerm) ||
					functions.includes(user.phone, debouncedSearchTerm)
			)
			setCompanies(filtered)
		} else {
			setCompanies(data || [])
		}
	}, [data, debouncedSearchTerm])

	const handleAddItem = () => {
		navigate(APP_ROUTES.APP.COMPANIES.ADD.path)
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Empresas"
				current="Empresas"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
				onAdd={handleAddItem}
			>
				<Grid item xs={12} md={4}>
					<TextField
						label="Buscar por nombre, teléfono, descripción"
						fullWidth
						size="small"
						onChange={(event) => {
							const value = event.target.value
							setSearchTerm(value)
						}}
					/>
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<CompaniesDataGrid data={companies || []} />
				</Card>
			</Grid>
		</Grid>
	)
}

export default CompaniesPage
