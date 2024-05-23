import useMediaQuery from '@/hooks/useMediaQueries'
import { Card, Grid, TextField } from '@mui/material'
import UsersDataGrid from './users-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'

const UsersPage = () => {
	const { isPhablet } = useMediaQuery()
	const navigate = useNavigate()

	const handleAddUser = () => {
		navigate(APP_ROUTES.APP.USERS.ADD.path)
	}
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Usuarios"
				current="Usuarios"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
				onAdd={handleAddUser}
			>
				<Grid item xs={12} md={4}>
					<TextField label="Buscar por nombre, apellido..." fullWidth size="small" />
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<UsersDataGrid />
				</Card>
			</Grid>
		</Grid>
	)
}

export default UsersPage
