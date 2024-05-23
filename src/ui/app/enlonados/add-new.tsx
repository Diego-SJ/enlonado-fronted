import useMediaQuery from '@/hooks/useMediaQueries'
import {
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useState } from 'react'

const AddNewEnlonado = () => {
	const { isPhablet } = useMediaQuery()
	const [plateType, setPlateType] = useState<'simple' | 'full'>('simple')
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Registrar enlonado"
				current="Nuevo enlonado"
				links={[{ name: 'Dashboard', path: APP_ROUTES.APP.DASHBOARD.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							Nuevo enlonado
						</Typography>
						<form noValidate onSubmit={() => console.log('first')}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="folio"
										label="Folio"
										name="folio"
										size="small"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										label="Empresa"
										name="company"
										id="company"
										size="small"
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={4}>
									<MobileDatePicker
										slotProps={{ textField: { size: 'small', margin: 'normal', fullWidth: true } }}
										label="Fecha"
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<div className="flex gap-4">
										<MobileTimePicker
											defaultValue={dayjs('2022-04-17T15:30')}
											label="Hora inicio"
											className="w-full"
											slotProps={{ textField: { size: 'small', margin: 'normal' } }}
										/>
										<MobileTimePicker
											defaultValue={dayjs('2022-04-17T15:30')}
											label="Hora fin"
											className="w-full"
											slotProps={{ textField: { size: 'small', margin: 'normal' } }}
										/>
									</div>
								</Grid>
							</Grid>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Placas"
								name="plates"
								id="plates"
								size="small"
								sx={{ marginBottom: 2 }}
							/>

							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">Tipo de plana</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-radio-buttons-group-label"
									value={plateType}
									onChange={(e) => setPlateType(e.target.value as 'simple' | 'full')}
									name="radio-buttons-group"
								>
									<FormControlLabel value="simple" control={<Radio />} label="Sencillo" />
									<FormControlLabel value="full" control={<Radio />} label="Completo" />
								</RadioGroup>
							</FormControl>

							<Grid container spacing={isPhablet ? 0 : 2}>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										label="Plana 1"
										size="small"
										name="flat1"
										id="flat1"
									/>
								</Grid>

								{plateType === 'full' && (
									<Grid item xs={12} md={6} className="">
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											label="Plana 2"
											size="small"
											name="flat2"
											id="flat2"
										/>
									</Grid>
								)}
							</Grid>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Nombre del chofer"
								name="driver_name"
								id="driver_name"
								size="small"
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								multiline
								maxRows={3}
								minRows={3}
								fullWidth
								label="Comentarios"
								name="comments"
								id="comments"
								size="small"
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								size="large"
								sx={{ marginTop: 1 }}
							>
								Registrar
							</Button>
						</form>
					</div>
				</Card>
			</Grid>
		</Grid>
	)
}

export default AddNewEnlonado
