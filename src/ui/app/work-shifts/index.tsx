import { Card, Grid } from '@mui/material'
import DataGrid from './work-shifts-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'

const WorkShiftsPage = () => {
	const navigate = useNavigate()

	const handleAddWorkShift = () => {
		navigate(APP_ROUTES.APP.WORK_SHIFTS.ADD.path)
	}
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Turnos"
				current="Turnos"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
				onAdd={handleAddWorkShift}
			/>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<DataGrid />
				</Card>
			</Grid>
		</Grid>
	)
}

export default WorkShiftsPage
