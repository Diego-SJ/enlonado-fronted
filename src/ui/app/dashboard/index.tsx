import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import { blue } from '@mui/material/colors'

const DashboardPage = () => {
	const navigate = useNavigate()

	const routeChange = () => {
		navigate(APP_ROUTES.APP.NEW_ENLONADO.path)
	}
	return (
		<Grid container>
			<Grid xs={12} md={12} lg={4}>
				<Card elevation={2} onClick={routeChange} sx={{ cursor: 'pointer' }}>
					<div className="px-6 py-4">
						<Avatar sx={{ width: 60, height: 60, bgcolor: blue.A400 }}>
							<PostAddOutlinedIcon sx={{ width: 40, height: 40 }} />
						</Avatar>
						<Typography variant="h6" sx={{ marginTop: 1 }}>
							Registrar enlonado
						</Typography>
					</div>
				</Card>
			</Grid>
		</Grid>
	)
}

export default DashboardPage
