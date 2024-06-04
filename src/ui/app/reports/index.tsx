import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import { useAppDispatch } from '@/hooks/useStore'
import { useEffect, useRef } from 'react'
import { reportsActions } from '@/redux/reducers/reports'

const ReportsPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	// const { flats_per_manager } = useAppSelector((state) => state.reports)
	const onMounted = useRef(false)

	useEffect(() => {
		if (!onMounted.current) {
			onMounted.current = true
			dispatch(reportsActions.getEnlonadosTotals())
		}
	}, [dispatch, onMounted])

	const routeChange = (path: string) => {
		navigate(path)
	}
	return (
		<Grid container spacing={2}>
			{/* <Grid item xs={12} md={4} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4 flex justify-between items-center">
						<div>
							<Typography variant="h6" sx={{ marginTop: 1 }}>
								{(totals?.simple || 0) + (totals?.full || 0)}
							</Typography>
							<Typography variant="body1" sx={{ marginTop: 1 }}>
								Enlonados Totales
							</Typography>
						</div>
						<Avatar sx={{ width: 60, height: 60, bgcolor: blue.A400 }}>
							<PostAddOutlinedIcon sx={{ width: 40, height: 40 }} />
						</Avatar>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} md={4} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4 flex justify-between items-center">
						<div>
							<Typography variant="h6" sx={{ marginTop: 1 }}>
								{totals?.simple || 0}
							</Typography>
							<Typography variant="body1" sx={{ marginTop: 1 }}>
								Enlonados Sencillos
							</Typography>
						</div>
						<Avatar sx={{ width: 60, height: 60, bgcolor: green.A400 }}>
							<PostAddOutlinedIcon sx={{ width: 40, height: 40 }} />
						</Avatar>
					</div>
				</Card>
			</Grid> */}

			{/* <Grid item xs={12} md={4} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4 flex justify-between items-center">
						<div>
							<Typography variant="h6" sx={{ marginTop: 1 }}>
								{totals?.full || 0}
							</Typography>
							<Typography variant="body1" sx={{ marginTop: 1 }}>
								Enlonados Completos
							</Typography>
						</div>
						<Avatar sx={{ width: 60, height: 60, bgcolor: orange.A400 }}>
							<PostAddOutlinedIcon sx={{ width: 40, height: 40 }} />
						</Avatar>
					</div>
				</Card>
			</Grid> */}

			<Grid item xs={12} md={6} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<CardContent>
						<Typography variant="h6" mb={0}>
							Planas por encargado
						</Typography>
						<Typography variant="body1" mb={2}>
							Planas realizadas por cada encargado en periodos de tiempo (semanas)
						</Typography>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={() => routeChange(APP_ROUTES.APP.REPORTS.FLATS_BY_MANAGER.path)}
						>
							Ver detalles
						</Button>
					</CardContent>
				</Card>
			</Grid>

			{/* <Grid item xs={12} md={6} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<CardContent>
						<Typography variant="h6" mb={0}>
							Planas por encargado
						</Typography>
						<Typography variant="body1" mb={2}>
							Planas realizadas por cada encargado en periodos de tiempo (semanas)
						</Typography>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={() => routeChange(APP_ROUTES.APP.REPORTS.FLATS_BY_MANAGER.path)}
						>
							Ver detalles
						</Button>
					</CardContent>
				</Card>
			</Grid> */}
		</Grid>
	)
}

export default ReportsPage
