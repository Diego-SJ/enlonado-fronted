import {
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Switch,
	TextField,
	Typography
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { User, UserRoles } from '@/redux/reducers/users/types'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import functions from '@/utils/functions'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'

const AddNewUser = () => {
	const navigate = useNavigate()
	const { user_id } = useParams()
	const dispatch = useAppDispatch()
	const { loading, data } = useAppSelector((state) => state.users)
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors, isDirty }
	} = useForm()
	const [showPassword, setShowPassword] = useState(false)
	const [createCredentiasl, setCreateCredentiasl] = useState(false)
	const [_, setCopiedText] = useCopyToClipboard()
	const [currentUser, setCurrentUser] = useState<Partial<User>>({})

	useEffect(() => {
		if (user_id) {
			let user = data.find((user: User) => user.user_id === user_id)
			if (user) {
				reset(user)
				setCurrentUser(user)
			}
		}
	}, [user_id])

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const onSubmit = async (data: Partial<User>) => {
		const result = await dispatch(userActions.createUser(data, user_id))

		if (result) {
			toast.success(`Usuario ${!!user_id ? 'actualizado' : 'creado'} con exito`)
			navigate(APP_ROUTES.APP.USERS.path)
		} else {
			toast.error('Error al guardar información')
		}
	}

	const onSwitchChange = (checked: boolean) => {
		setCreateCredentiasl(checked)
		if (checked) {
			const { password, name } = getValues()
			let randomPassword = functions.generateCrdentials(name, password)
			setValue('password', randomPassword)
			setValue('username', randomPassword)
			setShowPassword(true)
		} else {
			setValue('password', '')
			setValue('username', '')
			setShowPassword(false)
		}
	}

	const onCopy = () => {
		setCopiedText(`usuario: ${getValues('username')} - contraseña: ${getValues('password')}`)
		toast.success('Credenciales copiadas', { autoClose: 1000 })
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title={!!user_id ? 'Editar colaborador' : 'Nuevo colaborador'}
				current={user_id ? 'Editar' : 'Nuevo'}
				links={[{ name: 'Colaboradores', path: APP_ROUTES.APP.USERS.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							{!!user_id ? 'Editar colaborador' : 'Nuevo colaborador'}
						</Typography>
						<form onSubmit={handleSubmit(onSubmit as any)}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Controller
										name="name"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<TextField
												{...field}
												error={!!errors.name}
												helperText={(errors?.name?.message || null) as string}
												variant="outlined"
												margin="normal"
												fullWidth
												InputLabelProps={{ shrink: !!field.value }}
												label="Nombre (s)"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Controller
										name="surnames"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<TextField
												{...field}
												error={!!errors.surnames}
												helperText={(errors?.surnames?.message || '') as string}
												variant="outlined"
												margin="normal"
												fullWidth
												InputLabelProps={{ shrink: !!field?.value }}
												label="Apellidos"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Controller
										name="phone"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												fullWidth
												error={!!errors.phone}
												helperText={(errors?.phone?.message || '') as string}
												variant="outlined"
												margin="normal"
												InputLabelProps={{ shrink: !!field?.value }}
												size="small"
												label="Teléfono"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Controller
										name="role"
										rules={{ required: 'Campo obligatorio' }}
										control={control}
										render={({ field }) => (
											<FormControl fullWidth sx={{ marginTop: '16px' }}>
												<InputLabel id="role" sx={{ mt: '-7px' }} shrink={!!field?.value}>
													Rol
												</InputLabel>
												<Select
													{...field}
													label="Rol"
													value={field.value || ''}
													labelId="role"
													error={!!errors.role}
													size="small"
												>
													<MenuItem value={UserRoles.ADMIN}>Administrador</MenuItem>
													<MenuItem value={UserRoles.MANAGER}>Colaborador</MenuItem>
													<MenuItem value={UserRoles.SUPPORT}>Ayudante</MenuItem>
												</Select>
												{!!errors?.role && (
													<FormHelperText error>{errors?.role?.message as string}</FormHelperText>
												)}
											</FormControl>
										)}
									/>
								</Grid>

								<Grid item xs={12} md={6}>
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
												InputLabelProps={{ shrink: !!field?.value }}
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Controller
										name="password"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<FormControl fullWidth variant="outlined" sx={{ marginTop: '16px' }}>
												<InputLabel
													htmlFor="outlined-adornment-password"
													sx={{ mt: '-7px' }}
													shrink={!!field?.value}
												>
													Password
												</InputLabel>
												<OutlinedInput
													{...field}
													id="outlined-adornment-password"
													size="small"
													fullWidth
													error={!!errors.password}
													type={showPassword ? 'text' : 'password'}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
																edge="end"
															>
																{showPassword ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													}
													label="Password"
												/>
												{!!errors?.password && (
													<FormHelperText error>
														{errors?.password?.message as string}
													</FormHelperText>
												)}
											</FormControl>
										)}
									/>
								</Grid>

								<Grid item xs={6} md={6}>
									<FormControlLabel
										control={<Switch defaultChecked />}
										onChange={(_, checked) => onSwitchChange(checked)}
										checked={createCredentiasl}
										label="Generar credenciales aleatorias"
									/>
								</Grid>
								{(createCredentiasl || (currentUser?.username && currentUser?.password)) && (
									<Grid item xs={6} md={6}>
										<Button startIcon={<ContentCopyOutlinedIcon />} onClick={onCopy}>
											{'Copiar credenciales'}
										</Button>
									</Grid>
								)}
							</Grid>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								size="large"
								sx={{ marginTop: 3 }}
								disabled={loading || !isDirty}
							>
								{loading ? 'Cargando...' : !!user_id ? 'Guardar cambios' : 'Registrar'}
							</Button>
						</form>
					</div>
				</Card>
			</Grid>
		</Grid>
	)
}

export default AddNewUser
