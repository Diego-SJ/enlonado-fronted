import { Avatar, Button, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.users)
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async (data: { password: string; username: string }) => {
		const result = await dispatch(userActions.login(data.username, data.password))

		if (result) {
			navigate(APP_ROUTES.APP.DASHBOARD.path)
		} else {
			toast.error('Usuario o contraseña incorrectos')
		}
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
				<form onSubmit={handleSubmit(onSubmit as any)}>
					<Controller
						name="username"
						control={control}
						rules={{ required: 'Campo obligatorio' }}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.username}
								helperText={errors.username ? (errors.username.message as string) : ''}
								label="Usuario"
								variant="outlined"
								margin="normal"
								fullWidth
								autoFocus
								size="small"
							/>
						)}
					/>

					<Controller
						name="password"
						control={control}
						rules={{ required: 'Campo obligatorio' }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Contraseña"
								type="password"
								variant="outlined"
								error={!!errors.password}
								helperText={errors.password ? errors.password.message + '' : ''}
								margin="normal"
								fullWidth
								size="small"
								autoComplete="current-password"
							/>
						)}
					/>

					<Button
						fullWidth
						variant="contained"
						color="primary"
						sx={{ marginTop: 1 }}
						type="submit"
						disabled={loading}
					>
						{loading ? 'Cargando...' : 'Iniciar sesión'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
