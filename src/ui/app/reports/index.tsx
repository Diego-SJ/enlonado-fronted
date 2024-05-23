import {
	Avatar,
	Card,
	CardContent,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from '@mui/material'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
// import { useNavigate } from 'react-router-dom'
// import { APP_ROUTES } from '@/routes/routes'
import { blue, green, orange } from '@mui/material/colors'
import { LineChart, PieChart, pieArcLabelClasses } from '@mui/x-charts'

const ReportsPage = () => {
	// const navigate = useNavigate()

	// const routeChange = () => {
	// 	navigate(APP_ROUTES.APP.NEW_ENLONADO.path)
	// }
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={4} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4 flex justify-between items-center">
						<div>
							<Typography variant="h6" sx={{ marginTop: 1 }}>
								330
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
								180
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
			</Grid>

			<Grid item xs={12} md={4} lg={4}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4 flex justify-between items-center">
						<div>
							<Typography variant="h6" sx={{ marginTop: 1 }}>
								150
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
			</Grid>

			<Grid item xs={12} md={6} lg={6}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<CardContent>
						<Typography variant="h6" mb={0}>
							Enlonados a la semana
						</Typography>
						<Typography variant="body1" mb={2}>
							Enlonados realizados durante una semana
						</Typography>
						<LineChart
							yAxis={[{ data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }]}
							// xAxis={[
							// 	{ data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] }
							// ]}
							xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], label: 'Días' }]}
							series={[
								{
									label: 'Enlonado sencillo',
									data: [10, 23, 33, 14, 25, 16, 32]
								},
								{
									label: 'Enlonado completo',
									data: [15, 60, 78, 20, 34, 50, 35]
								}
							]}
							height={300}
							margin={{ left: 30, right: 30, top: 50, bottom: 50 }}
							grid={{ vertical: true, horizontal: true }}
						/>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={6} lg={6}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<CardContent>
						<Typography variant="h6" mb={0}>
							Enlonados pendientes
						</Typography>
						<Typography variant="body1" mb={2}>
							Relación sencillo - full
						</Typography>
						<PieChart
							series={[
								{
									data: [
										{ id: 0, value: 10, label: 'Sencillo' },
										{ id: 1, value: 15, label: 'Sencillo pendientes' },
										{ id: 2, value: 20, label: 'Full' },
										{ id: 3, value: 7, label: 'Full pendientes' }
									],
									highlightScope: { faded: 'global', highlighted: 'item' },
									// faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
									arcLabel: (item) => `${item.value}`
									// arcLabelMinAngle: 45
								}
							]}
							height={300}
							sx={{
								[`& .${pieArcLabelClasses.root}`]: {
									fill: 'white',
									fontWeight: 'bold'
								}
							}}
							slotProps={{
								legend: {
									direction: 'row',
									position: { vertical: 'bottom', horizontal: 'middle' }
								}
							}}
							margin={{ bottom: 100 }}
						/>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={6} lg={6}>
				<Card elevation={2} sx={{ cursor: 'pointer' }}>
					<CardContent className="w-full">
						<Typography variant="h6" mb={0}>
							Principales colaboradores
						</Typography>
						<Typography variant="body1" mb={2}>
							Colaboradores con mas enlonados
						</Typography>
						<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
							<ListItem alignItems="flex-start" className="border-b border-slate-200">
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
								</ListItemAvatar>
								<ListItemText
									primary="Juanito Lopez"
									secondary={
										<div className="flex justify-between">
											<span>Tiempo por enlonado promedio: 30 min</span>
											<span className="font-semibold text-blue-500 -mt-2">34 enlonados</span>
										</div>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start" className="border-b border-slate-200">
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
								</ListItemAvatar>
								<ListItemText
									primary="Fulanito Juarez"
									secondary={
										<div className="flex justify-between">
											<span>Tiempo por enlonado promedio: 20 min</span>
											<span className="font-semibold text-blue-500 -mt-2">30 enlonados</span>
										</div>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start" className="border-b border-slate-200">
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
								</ListItemAvatar>
								<ListItemText
									primary="Menganito Perez"
									secondary={
										<div className="flex justify-between">
											<span>Tiempo por enlonado promedio: 34 min</span>
											<span className="font-semibold text-blue-500 -mt-2">24 enlonados</span>
										</div>
									}
								/>
							</ListItem>
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}

export default ReportsPage
