import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'

import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'

const AddNewUser = () => {
	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Registrar colaborador"
				current="Nuevo"
				links={[{ name: 'Colaboradores', path: APP_ROUTES.APP.USERS.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							Nuevo colaborador
						</Typography>
						<form noValidate onSubmit={() => console.log('first')}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="name"
										name="name"
										label="Nombre (s)"
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
										label="Apellidos"
										name="last_name"
										id="last_name"
										size="small"
									/>
								</Grid>
								<Grid item xs={12} md={12}>
									<MobileDatePicker
										slotProps={{ textField: { size: 'small', margin: 'normal', fullWidth: true } }}
										label="Fecha de nacimiento"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										label="Email"
										name="email"
										id="email"
										type="email"
										size="small"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										label="Teléfono"
										name="phone"
										id="phone"
										type="tel"
										size="small"
									/>
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
										label="Comentarios"
										name="comments"
										id="comments"
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

export default AddNewUser
