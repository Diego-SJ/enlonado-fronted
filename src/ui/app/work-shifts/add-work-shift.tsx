import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { MobileTimePicker } from '@mui/x-date-pickers'

import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import dayjs from 'dayjs'

const AddWorkShiftPage = () => {
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Registrar turno"
				current="Nuevo"
				links={[{ name: 'Turnos', path: APP_ROUTES.APP.WORK_SHIFTS.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							Nuevo turno
						</Typography>
						<form noValidate onSubmit={() => console.log('first')}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="name"
										name="name"
										label="Nombre del turno"
										size="small"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<div className="flex gap-4">
										<MobileTimePicker
											defaultValue={dayjs()}
											label="Hora inicio"
											slotProps={{
												textField: { size: 'small', margin: 'normal', fullWidth: true }
											}}
										/>
										<MobileTimePicker
											defaultValue={dayjs()}
											label="Hora fin"
											slotProps={{
												textField: { size: 'small', margin: 'normal', fullWidth: true }
											}}
										/>
									</div>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										multiline
										maxRows={3}
										minRows={3}
										fullWidth
										label="Descripción"
										name="description"
										id="description"
										size="small"
									/>
								</Grid>
							</Grid>

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

export default AddWorkShiftPage
