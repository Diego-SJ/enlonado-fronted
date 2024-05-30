import {
	Box,
	Button,
	Card,
	Chip,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
	Theme,
	Typography,
	useTheme
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { Team, User } from '@/redux/reducers/users/types'
import { userActions } from '@/redux/reducers/users'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { formatTeamMembers, parseTeamMembers } from '@/utils/users'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
}

function getStyles(userId: string, personUserId: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personUserId.indexOf(userId) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium
	}
}

const AddWorkShiftPage = () => {
	const navigate = useNavigate()
	const { team_id } = useParams()
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const { loading, data: users, teams = [] } = useAppSelector((state) => state.users)
	const [members, setMembers] = useState<User[]>([])
	const [personUserId, setPersonUserId] = useState<string[]>([])
	const [managerId, setManagerId] = useState('')
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	useEffect(() => {
		const team_members = users.filter((user: User) => user.user_id !== managerId)
		setMembers(team_members)
	}, [users, managerId])

	useEffect(() => {
		if (team_id) {
			let team = teams.find((team) => team.team_id === team_id)
			if (team) {
				reset({ ...team, team_members: parseTeamMembers(team.team_members) })
			}
		}
	}, [team_id])

	const onSubmit = async (data: Partial<Team>) => {
		const result = await dispatch(
			userActions.createTeam(
				{
					...data,
					team_members: formatTeamMembers(data.team_members as string[], users)
				},
				team_id
			)
		)

		if (result) {
			toast.success(`Equipo ${!!team_id ? 'actualizado' : 'creado'} con exito`)
			navigate(APP_ROUTES.APP.WORK_SHIFTS.path)
		} else {
			toast.error('Error al guardar información')
		}
	}

	const handleChange = (event: SelectChangeEvent<typeof personUserId>) => {
		const {
			target: { value }
		} = event
		setPersonUserId(typeof value === 'string' ? value.split(',') : value)
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title={!!team_id ? 'Editar equipo' : 'Registrar equipo'}
				current="Nuevo"
				links={[{ name: 'Equipos', path: APP_ROUTES.APP.WORK_SHIFTS.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							{!!team_id ? 'Editar equipo' : 'Nuevo equipo'}
						</Typography>
						<form onSubmit={handleSubmit(onSubmit as any)}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
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
												label="Nombre del equipo"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="manager_id"
										rules={{ required: 'Campo obligatorio' }}
										control={control}
										render={({ field }) => (
											<FormControl fullWidth sx={{ marginTop: '16px' }}>
												<InputLabel id="manager" sx={{ mt: '-7px' }} shrink={!!field?.value}>
													Encargado
												</InputLabel>
												<Select
													{...field}
													onChange={(e) => {
														field.onChange(e)
														setManagerId(e.target.value as string)
													}}
													label="Encargado"
													value={field.value || ''}
													labelId="manager"
													error={!!errors.manager_id}
													size="small"
												>
													{users?.map((user) => (
														<MenuItem key={user.user_id} value={user.user_id}>
															{user.name}
														</MenuItem>
													))}
												</Select>
												{!!errors?.manager_id && (
													<FormHelperText error>
														{errors?.manager_id?.message as string}
													</FormHelperText>
												)}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="team_members"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<FormControl fullWidth sx={{ marginTop: 3 }}>
												<InputLabel
													id="demo-multiple-chip-label"
													sx={{ mt: '-7px' }}
													shrink={!!field?.value?.length}
												>
													Integrantes
												</InputLabel>
												<Select
													value={field?.value?.length ? field?.value || [] : []}
													onChange={(e) => {
														field.onChange(e)
														handleChange(e)
													}}
													labelId="demo-multiple-chip-label"
													id="demo-multiple-chip"
													multiple
													placeholder="Selecciona los integrantes del equipo"
													size="small"
													error={!!errors.team_members}
													input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
													renderValue={(selected = []) => (
														<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
															{selected?.length
																? (selected || [])?.map((userId: string) => (
																		<Chip
																			key={userId}
																			size="small"
																			label={
																				users.find((user) => user.user_id === userId)?.name ||
																				userId
																			}
																		/>
																  ))
																: null}
														</Box>
													)}
													MenuProps={MenuProps}
												>
													{members.map((user) => (
														<MenuItem
															key={user.user_id}
															value={user.user_id}
															style={getStyles(user.user_id, personUserId, theme)}
														>
															{user.name}
														</MenuItem>
													))}
												</Select>
												{!!errors?.team_members && (
													<FormHelperText error>
														{errors?.team_members?.message as string}
													</FormHelperText>
												)}
											</FormControl>
										)}
									/>
								</Grid>
							</Grid>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								size="large"
								sx={{ marginTop: 3 }}
								disabled={loading}
							>
								{loading ? 'Guardando...' : !!team_id ? 'Actualizar' : 'Guardar'}
							</Button>
						</form>
					</div>
				</Card>
			</Grid>
		</Grid>
	)
}

export default AddWorkShiftPage
