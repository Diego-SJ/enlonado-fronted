import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useEffect } from 'react'
import { Company } from '@/redux/reducers/companies/types'
import { companyActions } from '@/redux/reducers/companies'

const AddNewCompany = () => {
	const navigate = useNavigate()
	const { company_id } = useParams()
	const dispatch = useAppDispatch()
	const { loading, companies } = useAppSelector((state) => state.companies)
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	useEffect(() => {
		if (company_id) {
			let company = companies.find((user) => user.company_id === company_id)
			if (company) {
				reset(company)
			}
		}
	}, [company_id])

	const onSubmit = async (data: Partial<Company>) => {
		const result = await dispatch(companyActions.createCompany(data, company_id))

		if (result) {
			navigate(APP_ROUTES.APP.COMPANIES.path)
			toast.success(`Empresa ${!!company_id ? 'actualizada' : 'creada'} con exito`)
		} else {
			toast.error('Error al guardar información')
		}
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title={!!company_id ? 'Editar empresa' : 'Nueva empresa'}
				current={company_id ? 'Editar' : 'Nueva'}
				links={[{ name: 'Empresas', path: APP_ROUTES.APP.USERS.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							{!!company_id ? 'Editar colaborador' : 'Nueva empresa'}
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
												required
												InputLabelProps={{ shrink: !!field.value }}
												label="Nombre"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
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
								<Grid item xs={12}>
									<Controller
										name="description"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												error={!!errors.name}
												helperText={(errors?.name?.message || null) as string}
												variant="outlined"
												margin="normal"
												fullWidth
												minRows={3}
												multiline
												InputLabelProps={{ shrink: !!field.value }}
												label="Descripción"
												size="small"
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
								sx={{ marginTop: 3 }}
								disabled={loading}
							>
								{loading ? 'Cargando...' : !!company_id ? 'Guardar cambios' : 'Registrar'}
							</Button>
						</form>
					</div>
				</Card>
			</Grid>
		</Grid>
	)
}

export default AddNewCompany
