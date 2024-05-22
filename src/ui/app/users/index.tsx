import useMediaQuery from '@/hooks/useMediaQueries'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import UsersDataGrid from './users-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'

const UsersPage = () => {
	const { isPhablet } = useMediaQuery()
	const navigate = useNavigate()

	const handleAddUser = () => {
		navigate(APP_ROUTES.APP.USERS.ADD.path)
	}
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card elevation={0}>
					<div className="pt-4 px-6 pb-7">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							Colaboradores
						</Typography>

						<div className="flex mt-2">
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<TextField label="Buscar por nombre, apellido..." fullWidth size="small" />
								</Grid>
								<Grid item xs={12} md={6} lg={3}>
									<Button
										variant="contained"
										color="primary"
										size="medium"
										fullWidth
										sx={{ height: '40px' }}
										onClick={handleAddUser}
									>
										Agregar colaborador
									</Button>
								</Grid>
							</Grid>
						</div>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<UsersDataGrid />
				</Card>
			</Grid>
		</Grid>
	)
}

export default UsersPage
