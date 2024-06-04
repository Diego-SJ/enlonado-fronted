import { Box, Button, Card, Grid, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { useEffect, useRef, useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useStore'

import CompanyInfoPanel from './detail-info'
import { CustomTabPanel, a11yProps } from '../enlonados/enlonado-detail'
import { companyActions } from '@/redux/reducers/companies'
import { EditOutlined } from '@mui/icons-material'

const CompanyDetailPage = () => {
	const { company_id } = useParams()
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)

	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current && !!company_id) {
			firstRender.current = true
			dispatch(companyActions.fetchCompanyById(company_id))
		}
	}, [company_id, dispatch])

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Detalle de empresa"
				current="Detalle"
				links={[
					{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path },
					{ name: 'Empresas', path: APP_ROUTES.APP.COMPANIES.path }
				]}
				topActions={
					<Link to={APP_ROUTES.APP.COMPANIES.EDIT.hash`${company_id!}`}>
						<Button
							variant="contained"
							color="warning"
							sx={{ color: 'white' }}
							startIcon={<EditOutlined />}
						>
							Editar
						</Button>
					</Link>
				}
			/>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab
									label="Detalles"
									icon={<InfoOutlinedIcon />}
									iconPosition="start"
									{...a11yProps(0)}
									sx={{ minHeight: 'unset', paddingTop: '12px' }}
								/>
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<CompanyInfoPanel />
						</CustomTabPanel>
					</Box>
				</Card>
			</Grid>
		</Grid>
	)
}

export default CompanyDetailPage
