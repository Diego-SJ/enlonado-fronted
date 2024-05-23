import { Card, Grid, TextField } from '@mui/material'
import EnlonadosDataGrid from './enlonados-data-grid'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

const EnlonadosPage = () => {
	// const navigate = useNavigate()

	// const handleAddUser = () => {
	// 	navigate(APP_ROUTES.APP.USERS.ADD.path)
	// }
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Enlonados"
				current="Enlonados"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
			>
				<Grid item xs={12} sm={12} md={4}>
					<TextField label="Buscar por colaborador, empresa o placas" fullWidth size="small" />
				</Grid>
				<Grid item xs={6} sm={6} md={4}>
					<MobileDatePicker
						label="Fecha inicio"
						defaultValue={dayjs()}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={4}>
					<MobileDatePicker
						label="Fecha fin"
						defaultValue={dayjs()}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<EnlonadosDataGrid />
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosPage
