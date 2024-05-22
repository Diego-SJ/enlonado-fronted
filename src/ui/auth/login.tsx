import { Avatar, Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'

const LoginPage = () => {
	const navigate = useNavigate()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate(APP_ROUTES.APP.HOME.path)
	}
	return (
		<div className="w-full grid place-content-center h-screen">
			<div className="w-full sm:max-w-[400px] mb-10 rounded-3xl sm:shadow-2xl py-10 px-8">
				<div className="flex justify-center">
					<Avatar sx={{ width: 100, height: 100, bgcolor: blue.A400 }}>
						<LockOutlinedIcon sx={{ width: 50, height: 50 }} />
					</Avatar>
				</div>
				<h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">Inicio de sesión</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					ingresa tus datos para iniciar sesión
				</p>
				<form noValidate onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="user"
						label="Usuario"
						name="user"
						autoFocus
						size="small"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						size="small"
						autoComplete="current-password"
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 1 }}>
						Ingresar
					</Button>
					<Grid container>
						<Grid item xs sx={{ marginTop: 1 }}>
							<Link to="/">¿Olvidaste tu contraseña?</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
