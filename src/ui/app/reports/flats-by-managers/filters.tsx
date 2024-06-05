import useMediaQuery from '@/hooks/useMediaQueries'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { reportsActions } from '@/redux/reducers/reports'
import { User, UserRoles } from '@/redux/reducers/users/types'
import { GroupedData } from '@/utils/reports'
import { DeleteOutline, PictureAsPdfOutlined } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Card,
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/es'
import { toast } from 'react-toastify'

type Props = {
	downloadPDF: () => void
}

const FlatsByManagerFilters = ({ downloadPDF }: Props) => {
	const dispatch = useAppDispatch()
	const { data: users } = useAppSelector((state) => state.users)
	const { isDesktop } = useMediaQuery()
	const { flats_per_manager, loading } = useAppSelector((state) => state.reports)
	const userList = flats_per_manager?.users || []

	const startDateChange = (date: Dayjs | null) => {
		dispatch(reportsActions.handleWeeks({ start: date }))
	}

	const endDateChange = (date: Dayjs | null) => {
		dispatch(reportsActions.handleWeeks({ end: date }))
	}

	const clearFilters = () => {
		dispatch(reportsActions.handleWeeks({ start: null, end: null }))
		dispatch(reportsActions.setFlatsPerManager({ users: [] }))
		dispatch(
			reportsActions.setGroupedData({ totalsByWeek: {}, finalTotal: { value: 0 } } as GroupedData)
		)
	}

	const handleToggle = (value: User) => () => {
		if (userList.length > 5) {
			toast.info('No puedes seleccionar más de 6 encargados')
			return
		}

		const currentIndex = userList?.findIndex((user) => user?.user_id === value?.user_id)
		const newChecked = [...userList]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		dispatch(reportsActions.setFlatsPerManager({ users: newChecked }))
		dispatch(reportsActions.flatsByManagerReport())
	}

	return (
		<Card>
			<div className="px-4 pt-4 mb-1">
				<Typography variant="h6">Filtros</Typography>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-1">
				<div>
					<div className="px-4">
						<Typography variant="body1">Encargados</Typography>
					</div>
					<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
						{[...users]
							?.filter((u) => [UserRoles.ADMIN, UserRoles.MANAGER].includes(u?.role as UserRoles))
							?.map((user) => {
								const labelId = `checkbox-list-label-${user.user_id}`

								return (
									<ListItem
										key={user.user_id}
										disablePadding
										secondaryAction={
											<Checkbox
												edge="start"
												checked={userList.findIndex((u) => u?.user_id === user?.user_id) !== -1}
												tabIndex={-1}
												disableRipple
												inputProps={{ 'aria-labelledby': labelId }}
											/>
										}
									>
										<ListItemButton role={undefined} onClick={handleToggle(user)} dense>
											<ListItemIcon sx={{ minWidth: '28px' }}>
												<Avatar
													sx={{ width: 20, height: 20, fontSize: 12 }}
													alt={user.name}
													src={`/static/images/avatar/${user.name}.jpg`}
												/>
											</ListItemIcon>
											<ListItemText id={labelId} primary={user?.name} />
										</ListItemButton>
									</ListItem>
								)
							})}
					</List>
				</div>

				<div className="px-4 pt-4 pb-8">
					<Typography variant="body1" mb={0}>
						Rango de fechas
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
						<MobileDatePicker
							slotProps={{
								textField: {
									size: 'small',
									margin: 'normal',
									fullWidth: true

									// helperText: (errors?.date?.message || '') as string,
									// error: !!errors.date,
									// InputLabelProps: { shrink: !!field?.value }
								}
							}}
							closeOnSelect
							orientation={isDesktop ? 'landscape' : 'portrait'}
							displayWeekNumber
							value={dayjs(flats_per_manager?.interval?.start)}
							onAccept={startDateChange}
							label="Desde"
							disabled={loading}
						/>
					</LocalizationProvider>

					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
						<MobileDatePicker
							slotProps={{
								textField: {
									size: 'small',
									margin: 'normal',
									label: 'Hasta',
									fullWidth: true,
									id: 'end-date'
									// helperText: (errors?.date?.message || '') as string,
									// error: !!errors.date,
									// InputLabelProps: { shrink: !!field?.value }
								}
							}}
							orientation={isDesktop ? 'landscape' : 'portrait'}
							closeOnSelect
							displayWeekNumber
							minDate={dayjs(flats_per_manager?.interval?.start)}
							onAccept={endDateChange}
							value={dayjs(flats_per_manager?.interval?.end)}
							label="Hasta"
							disabled={loading}
							views={['year', 'month', 'day']}
						/>
					</LocalizationProvider>
					<div className="flex flex-col gap-3 mt-3">
						<Button
							onClick={clearFilters}
							fullWidth
							disabled={loading}
							startIcon={<DeleteOutline />}
						>
							Limpiar filtros
						</Button>
						<Button
							fullWidth
							disabled={loading}
							startIcon={<PictureAsPdfOutlined />}
							onClick={downloadPDF}
						>
							Descargar PDF
						</Button>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default FlatsByManagerFilters
