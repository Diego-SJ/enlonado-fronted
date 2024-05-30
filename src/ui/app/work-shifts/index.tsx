import { Card, Grid } from '@mui/material'
import DataGrid from './work-shifts-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useEffect, useRef } from 'react'
import { userActions } from '@/redux/reducers/users'

const WorkShiftsPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { teams = [] } = useAppSelector((state) => state.users)
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(userActions.fetchTeams())
		}
	}, [dispatch, firstRender])

	const handleAddWorkShift = () => {
		navigate(APP_ROUTES.APP.WORK_SHIFTS.ADD.path)
	}
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Equipos"
				current="Equipos"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
				onAdd={handleAddWorkShift}
			/>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<DataGrid data={teams} />
				</Card>
			</Grid>
		</Grid>
	)
}

export default WorkShiftsPage
