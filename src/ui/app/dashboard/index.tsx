import { Avatar, Card, Grid, Typography } from '@mui/material'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import { blue, green, orange, purple } from '@mui/material/colors'
import { AddBusinessOutlined, GroupAddOutlined, PersonAddAlt1Outlined } from '@mui/icons-material'
import { useAppSelector } from '@/hooks/useStore'

const DashboardPage = () => {
	const navigate = useNavigate()
	const isAdmin = useAppSelector((state) => !!state?.users?.user_auth?.user?.is_admin)

	const routeChange = (path: string) => {
		navigate(path)
	}
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					elevation={2}
					onClick={() => routeChange(APP_ROUTES.APP.ENLONADOS.ADD.path)}
					sx={{ cursor: 'pointer' }}
				>
					<div className="px-6 py-4">
						<Avatar sx={{ width: 60, height: 60, bgcolor: green.A400 }}>
							<PostAddOutlinedIcon sx={{ width: 40, height: 40 }} />
						</Avatar>
						<Typography variant="h6" sx={{ marginTop: 1 }}>
							Registrar enlonado
						</Typography>
					</div>
				</Card>
			</Grid>

			{isAdmin && (
				<>
					<Grid item xs={12} md={6} lg={4}>
						<Card
							elevation={2}
							onClick={() => routeChange(APP_ROUTES.APP.COMPANIES.ADD.path)}
							sx={{ cursor: 'pointer' }}
						>
							<div className="px-6 py-4">
								<Avatar sx={{ width: 60, height: 60, bgcolor: orange.A400 }}>
									<AddBusinessOutlined sx={{ width: 40, height: 40 }} />
								</Avatar>
								<Typography variant="h6" sx={{ marginTop: 1 }}>
									Registrar empresa
								</Typography>
							</div>
						</Card>
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<Card
							elevation={2}
							onClick={() => routeChange(APP_ROUTES.APP.USERS.ADD.path)}
							sx={{ cursor: 'pointer' }}
						>
							<div className="px-6 py-4">
								<Avatar sx={{ width: 60, height: 60, bgcolor: blue.A400 }}>
									<PersonAddAlt1Outlined sx={{ width: 40, height: 40 }} />
								</Avatar>
								<Typography variant="h6" sx={{ marginTop: 1 }}>
									Registrar colaborador
								</Typography>
							</div>
						</Card>
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<Card
							elevation={2}
							onClick={() => routeChange(APP_ROUTES.APP.WORK_SHIFTS.ADD.path)}
							sx={{ cursor: 'pointer' }}
						>
							<div className="px-6 py-4">
								<Avatar sx={{ width: 60, height: 60, bgcolor: purple.A400 }}>
									<GroupAddOutlined sx={{ width: 40, height: 40 }} />
								</Avatar>
								<Typography variant="h6" sx={{ marginTop: 1 }}>
									Registrar equipo
								</Typography>
							</div>
						</Card>
					</Grid>
				</>
			)}
		</Grid>
	)
}

export default DashboardPage
