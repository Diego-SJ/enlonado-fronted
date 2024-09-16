import {
	Avatar,
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Switch,
	TextField,
	Typography
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { ROLE_NAME, User, UserRoles } from '@/redux/reducers/users/types'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import functions from '@/utils/functions'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { blue } from '@mui/material/colors'
import Chip from '@/ui/common/chip'
import UsersPermissions from './permissions'

const EditProfilePage = () => {
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
		const result = await dispatch(userActions.updateUserProfile(data, user_id))

		if (result) {
			toast.success(`Perfil actualizado con exito`)
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
			reset(currentUser)
		}
	}

	const onCopy = () => {
		setCopiedText(`usuario: ${getValues('username')} - contraseña: ${getValues('password')}`)
		toast.success('Credenciales copiadas', { autoClose: 1000 })
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Mi perfil"
				current="Perfil"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="flex flex-col justify-between px-4 pt-4 pb-6 sm:flex-row md:px-8 md:py-10">
						<div className="flex gap-4 my-auto items-center">
							<Avatar sx={{ width: 60, height: 60, background: blue.A400, fontSize: 30 }}>
								{currentUser?.name?.charAt(0).toUpperCase() || 'U'}
							</Avatar>
							<div className="flex flex-col">
								<h5 className="font-medium text-xl mb-2">
									{currentUser?.name} {currentUser?.surnames}
								</h5>
								<Typography variant="body1" sx={{ color: 'text.secondary' }}>
									{currentUser?.phone || 'Sin teléfono'}
								</Typography>
							</div>
						</div>

						<div className="h-full flex justify-center mt-6 my-auto sm:justify-end">
							<Chip color="default" label={ROLE_NAME[currentUser?.role as UserRoles]} />
						</div>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							Editar perfil
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

								<Grid item xs={12} md={6}></Grid>

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

							<UsersPermissions />

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

export default EditProfilePage
