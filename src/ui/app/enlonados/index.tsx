import useMediaQuery from '@/hooks/useMediaQueries'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import EnlonadosDataGrid from './enlonados-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'

const EnlonadosPage = () => {
	const navigate = useNavigate()

	const handleAddUser = () => {
		navigate(APP_ROUTES.APP.USERS.ADD.path)
	}
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Enlonados"
				current="Enlonados"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
			/>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<EnlonadosDataGrid />
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosPage
