import {
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { Controller, useForm } from 'react-hook-form'
import { enlonadosActions } from '@/redux/reducers/enlonados'
import {
	ENLONADO_PAYMENT_METHOD,
	Enlonado,
	EnlonadoFlatType,
	FLAT_TYPE,
	FlatValue
} from '@/redux/reducers/enlonados/types'
import { toast } from 'react-toastify'
import functions from '@/utils/functions'

const EnlonadoEditPanel = () => {
	const dispatch = useAppDispatch()
	const { enlonado_id } = useParams()
	const { companies } = useAppSelector((state) => state.companies)
	const { loading, enlonado } = useAppSelector((state) => state.enlonados)
	const [, setPlateType] = useState<EnlonadoFlatType>(FLAT_TYPE.SIMPLE)
	const [times, setTimes] = useState<{ startTime: string | null; endTime: string | null }>({
		startTime: null,
		endTime: null
	})
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues: {
			flat_type: FLAT_TYPE.SIMPLE
		} as Partial<Enlonado>
	})

	useEffect(() => {
		if (!!enlonado?.enlonado_id) {
			reset({
				folio: enlonado.folio,
				company_id: enlonado.company_id,
				plate: enlonado.plate,
				flat_type: enlonado.flat_type,
				flat_1: enlonado.flat_1,
				flat_2: enlonado.flat_2,
				driver_name: enlonado.driver_name,
				payment_method: enlonado.payment_method,
				comments: enlonado.comments,
				date: dayjs(enlonado.date),
				start_time: dayjs(enlonado.date + ' ' + enlonado.start_time),
				end_time: dayjs(enlonado.date + ' ' + enlonado.end_time)
			})
		}
	}, [enlonado, reset])

	const secondTimeError = useMemo(() => {
		if ((!times.startTime || !times.endTime) && !errors?.start_time?.message) return null
		if (!!errors?.start_time?.message) return errors?.start_time?.message

		let isValid = functions.isValidSecondTime(times.startTime, times.endTime)

		return !isValid ? 'La hora fin debe ser mayor a la hora inicio' : null
	}, [errors?.start_time?.message, times])

	const onSubmit = async (data: Partial<Enlonado>) => {
		if (secondTimeError) return false

		let times = {
			start_time: dayjs(data.start_time).format('HH:mm'),
			end_time: dayjs(data.end_time).format('HH:mm'),
			date: dayjs(data.date).format('YYYY-MM-DD')
		}
		let totalPlates = FlatValue[data?.flat_type || FLAT_TYPE.SIMPLE]
		let payload: Partial<Enlonado> = {
			...data,
			...times,
			time_per_flat:
				functions.calculateMinutesBetweenTimes(times.start_time, times.end_time) / totalPlates
		}

		const result = await dispatch(enlonadosActions.createEnlonado(payload, enlonado_id))

		if (!!result) {
			await toast.success(`Registro actualizado con exito`)
		} else {
			toast.error('Error al guardar información')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit as any)}>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<Controller
						name="folio"
						control={control}
						rules={{ required: 'Campo obligatorio' }}
						render={({ field }) => (
							<TextField
								{...field}
								InputLabelProps={{ shrink: !!field.value }}
								variant="outlined"
								margin="normal"
								size="small"
								fullWidth
								disabled
								inputProps={{ style: { textTransform: 'uppercase' } }}
								helperText={(errors?.folio?.message || null) as string}
								error={!!errors.folio}
								label="Folio"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Controller
						name="company_id"
						rules={{ required: 'Campo obligatorio' }}
						control={control}
						render={({ field }) => (
							<FormControl fullWidth sx={{ marginTop: '16px' }}>
								<InputLabel id="company" sx={{ mt: '-7px' }} shrink={!!field?.value}>
									Empresa
								</InputLabel>
								<Select
									{...field}
									value={field.value || enlonado?.company_id || ''}
									label="Empresa"
									labelId="company"
									disabled
									error={!!errors.company_id}
									size="small"
								>
									{!!companies?.length
										? companies?.map((company) => (
												<MenuItem key={company.company_id} value={company.company_id}>
													{company.name}
												</MenuItem>
										  ))
										: null}
								</Select>
								{!!errors?.company_id && (
									<FormHelperText error>{errors?.company_id?.message as string}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name="plate"
						control={control}
						rules={{ required: 'Campo obligatorio' }}
						render={({ field }) => (
							<TextField
								{...field}
								InputLabelProps={{ shrink: !!field.value }}
								variant="outlined"
								margin="normal"
								size="small"
								fullWidth
								disabled
								helperText={(errors?.plate?.message || '') as string}
								error={!!errors.plate}
								label="Placas"
								inputProps={{ style: { textTransform: 'uppercase' } }}
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name="flat_type"
						control={control}
						rules={{ required: 'Campo obligatorio' }}
						render={({ field }) => (
							<FormControl disabled>
								<FormLabel id="demo-radio-buttons-group-label">Tipo de plana</FormLabel>
								<RadioGroup
									{...field}
									row
									aria-labelledby="demo-radio-buttons-group-label"
									onChange={(e) => {
										setPlateType(e.target.value)
										field.onChange(e)
									}}
								>
									<FormControlLabel value={FLAT_TYPE.SIMPLE} control={<Radio />} label="Sencillo" />
									<FormControlLabel value={FLAT_TYPE.FULL} control={<Radio />} label="Full" />
								</RadioGroup>
								{!!errors?.flat_type && (
									<FormHelperText error>{errors?.flat_type?.message as string}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<div className="flex gap-4">
						<Controller
							name="flat_1"
							control={control}
							rules={{ required: 'Campo obligatorio' }}
							render={({ field }) => (
								<TextField
									{...field}
									InputLabelProps={{ shrink: !!field.value }}
									variant="outlined"
									margin="normal"
									size="small"
									fullWidth
									disabled
									helperText={
										(!!errors?.flat_1?.message ? errors?.flat_1?.message : null) as string
									}
									error={!!errors.flat_1}
									label="Plana 1"
									inputProps={{ style: { textTransform: 'uppercase' } }}
								/>
							)}
						/>
						{enlonado?.flat_type === FLAT_TYPE.FULL && (
							<Controller
								name="flat_2"
								control={control}
								rules={{ required: 'Campo obligatorio' }}
								render={({ field }) => (
									<TextField
										{...field}
										InputLabelProps={{ shrink: !!field.value }}
										variant="outlined"
										margin="normal"
										size="small"
										fullWidth
										disabled
										helperText={(errors?.flat_2?.message || '') as string}
										error={!!errors.flat_2}
										label="Plana 2"
										inputProps={{ style: { textTransform: 'uppercase' } }}
									/>
								)}
							/>
						)}
					</div>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name="driver_name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								InputLabelProps={{ shrink: !!field.value }}
								variant="outlined"
								margin="normal"
								size="small"
								disabled
								fullWidth
								helperText={(errors?.driver_name?.message || '') as string}
								error={!!errors.driver_name}
								label="Chofer"
								inputProps={{ style: { textTransform: 'uppercase' } }}
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12} md={12} lg={4}>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<MobileDatePicker
								slotProps={{
									textField: {
										size: 'small',
										margin: 'normal',
										fullWidth: true,
										helperText: (errors?.date?.message || '') as string,
										error: !!errors.date,
										InputLabelProps: { shrink: !!field?.value }
									}
								}}
								disabled={enlonado?.payment_method !== ENLONADO_PAYMENT_METHOD.PENDING}
								value={field.value as any}
								onChange={(date) => field.onChange(date)}
								label="Fecha"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} md={12} lg={8}>
					<div className="flex gap-4">
						<Controller
							name="start_time"
							control={control}
							render={({ field }) => (
								<MobileTimePicker
									slotProps={{
										textField: {
											size: 'small',
											margin: 'normal',
											fullWidth: true,
											helperText: (errors?.start_time?.message || '') as string,
											error: !!errors.start_time,
											InputLabelProps: { shrink: !!field?.value }
										}
									}}
									disabled={enlonado?.payment_method !== ENLONADO_PAYMENT_METHOD.PENDING}
									value={field.value as any}
									onChange={(date) => {
										setTimes((prev) => {
											let formated = dayjs(date).format('HH:mm')
											return { ...prev, startTime: formated }
										})
										field.onChange(date)
									}}
									label="Hora inicio"
								/>
							)}
						/>

						<Controller
							name="end_time"
							control={control}
							render={({ field }) => (
								<MobileTimePicker
									slotProps={{
										textField: {
											size: 'small',
											margin: 'normal',
											fullWidth: true,
											helperText: secondTimeError,
											error: !!secondTimeError,
											InputLabelProps: { shrink: !!field?.value }
										}
									}}
									disabled={enlonado?.payment_method !== ENLONADO_PAYMENT_METHOD.PENDING}
									value={field.value as any}
									onChange={(date) => {
										setTimes((prev) => {
											let formated = dayjs(date).format('HH:mm')
											return { ...prev, endTime: formated }
										})
										field.onChange(date)
									}}
									label="Hora fin"
								/>
							)}
						/>
					</div>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name="payment_method"
						rules={{ required: 'Campo obligatorio' }}
						control={control}
						render={({ field }) => (
							<FormControl fullWidth sx={{ marginTop: '16px' }}>
								<InputLabel id="payment_method" sx={{ mt: '-7px' }} shrink={!!field?.value}>
									Método de pago
								</InputLabel>
								<Select
									{...field}
									value={field.value || enlonado?.payment_method || ''}
									label="Método de pago"
									labelId="payment_method"
									error={!!errors.payment_method}
									disabled={enlonado?.payment_method !== ENLONADO_PAYMENT_METHOD.PENDING}
									size="small"
								>
									<MenuItem value={ENLONADO_PAYMENT_METHOD.CASH}>Efectivo</MenuItem>
									<MenuItem value={ENLONADO_PAYMENT_METHOD.TRANSFER}>Transferencia</MenuItem>
									<MenuItem value={ENLONADO_PAYMENT_METHOD.CREDIT}>Crédito</MenuItem>
									<MenuItem value={ENLONADO_PAYMENT_METHOD.PENDING}>Pendiente</MenuItem>
								</Select>
								{!!errors?.payment_method && (
									<FormHelperText error>{errors?.payment_method?.message as string}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name="comments"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								InputLabelProps={{ shrink: !!field.value }}
								variant="outlined"
								margin="normal"
								size="small"
								fullWidth
								multiline
								maxRows={3}
								minRows={3}
								helperText={(errors?.comments?.message || '') as string}
								error={!!errors.comments}
								label="Comentarios"
							/>
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
				disabled={loading}
				sx={{ marginTop: 1 }}
			>
				{loading ? 'Guardando...' : 'Guardar'}
			</Button>
		</form>
	)
}

export default EnlonadoEditPanel
