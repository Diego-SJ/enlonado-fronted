import {
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Breadcrumb from '../layout/breadcrumb'
import { APP_ROUTES } from '@/routes/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { Company, CompanyContactInfo } from '@/redux/reducers/companies/types'
import { companyActions } from '@/redux/reducers/companies'
import { ENLONADO_PAYMENT_METHOD } from '@/redux/reducers/enlonados/types'
import { AddOutlined, DeleteOutline } from '@mui/icons-material'
import functions from '@/utils/functions'

const AddNewCompany = () => {
	const navigate = useNavigate()
	const { company_id } = useParams()
	const dispatch = useAppDispatch()
	const { loading, companies } = useAppSelector((state) => state.companies)
	const [{ phones, emails }, setContactInfo] = useState<CompanyContactInfo>({
		emails: [],
		phones: []
	})
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm()

	useEffect(() => {
		if (company_id) {
			let company = companies.find((user) => user.company_id === company_id)
			if (company) {
				reset(company)
				setValue('payment_method', company.payment_method)
				setContactInfo(company?.contact_info || { emails: [], phones: [] })
			}
		}
	}, [company_id])

	const addPhoneItem = () => {
		setContactInfo((prev) => ({
			...prev,
			phones: [...(prev?.phones || []), { id: functions.generateRandomId(), name: '', value: '' }]
		}))
	}

	const removePhoneItem = (id: number) => {
		setContactInfo((prev) => ({
			...prev,
			phones: prev?.phones?.filter((phone) => phone.id !== id)
		}))
	}

	const onPhoneChange = (id: number, key: string, value: string) => {
		setContactInfo((prev) => {
			let newPhones = prev?.phones?.map((phone) => {
				if (phone.id === id) {
					return { ...phone, [key]: value }
				}
				return phone
			})
			return { ...prev, phones: newPhones }
		})
	}

	const addEmailItem = () => {
		setContactInfo((prev) => ({
			...prev,
			emails: [...(prev?.emails || []), { id: functions.generateRandomId(), name: '', value: '' }]
		}))
	}
	const removeEmailItem = (id: number) => {
		setContactInfo((prev) => ({
			...prev,
			emails: prev?.emails?.filter((email) => email.id !== id)
		}))
	}
	const onEmailChange = (id: number, key: string, value: string) => {
		setContactInfo((prev) => {
			let newEmails = prev?.emails?.map((email) => {
				if (email.id === id) {
					return { ...email, [key]: value }
				}
				return email
			})
			return { ...prev, emails: newEmails }
		})
	}

	const onSubmit = async (data: Partial<Company>) => {
		let payload = { ...data, contact_info: { phones, emails } }
		const result = await dispatch(companyActions.createCompany(payload, company_id))

		if (result) {
			toast.success(`Empresa ${!!company_id ? 'actualizada' : 'creada'} con exito`)

			if (company_id) navigate(-1)
			else navigate(APP_ROUTES.APP.COMPANIES.path)
		} else {
			toast.error('Error al guardar información')
		}
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title={!!company_id ? 'Editar empresa' : 'Nueva empresa'}
				current={company_id ? 'Editar' : 'Nueva'}
				links={[{ name: 'Empresas', path: APP_ROUTES.APP.COMPANIES.path }]}
			/>

			<Grid item xs={12} lg={8} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<div className="px-4 pt-4 pb-6 md:px-8 md:py-10">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							{!!company_id ? 'Editar empresa' : 'Nueva empresa'}
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
												label="Nombre corto"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="social_reason"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<TextField
												{...field}
												error={!!errors.social_reason}
												helperText={(errors?.social_reason?.message || null) as string}
												variant="outlined"
												margin="normal"
												fullWidth
												required
												InputLabelProps={{ shrink: !!field.value }}
												label="Razón social"
												size="small"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="payment_method"
										control={control}
										rules={{ required: 'Campo obligatorio' }}
										render={({ field }) => (
											<FormControl required>
												<FormLabel id="demo-radio-buttons-group-label">Método de pago</FormLabel>
												<RadioGroup
													{...field}
													value={field?.value || ENLONADO_PAYMENT_METHOD.CASH}
													row
													aria-labelledby="demo-radio-buttons-group-label"
												>
													<FormControlLabel
														value={ENLONADO_PAYMENT_METHOD.CASH}
														control={<Radio />}
														label="Efectivo"
													/>
													<FormControlLabel
														value={ENLONADO_PAYMENT_METHOD.CREDIT}
														control={<Radio />}
														label="Crédito"
													/>
												</RadioGroup>
												{!!errors?.payment_method && (
													<FormHelperText error>
														{errors?.payment_method?.message as string}
													</FormHelperText>
												)}
											</FormControl>
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
												label="Teléfono principal"
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography mb={1}>Otros teléfonos</Typography>
									{phones?.map((phone, index) => (
										<div
											key={index}
											className="grid grid-cols-2 gap-1 sm:grid-cols-[40%_40%_auto] sm:gap-4 place-items-end"
										>
											<TextField
												fullWidth
												value={phone.name}
												variant="outlined"
												margin="normal"
												size="small"
												label="Nombre"
												onChange={(e) => onPhoneChange(phone.id!, 'name', e.target.value)}
											/>
											<TextField
												fullWidth
												variant="outlined"
												margin="normal"
												value={phone.value}
												size="small"
												label="Teléfono"
												onChange={(e) => onPhoneChange(phone.id!, 'value', e.target.value)}
											/>
											<Button
												color="error"
												size="small"
												onClick={() => removePhoneItem(phone.id!)}
												variant="contained"
												sx={{ height: 40, mb: 1, mr: 'auto' }}
											>
												<DeleteOutline />
											</Button>
										</div>
									))}
									<Button startIcon={<AddOutlined />} onClick={addPhoneItem}>
										Nuevo teléfono
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Typography mb={1}>Correos</Typography>
									{emails?.map((email, index) => (
										<div
											key={index}
											className="grid grid-cols-2 gap-1 sm:grid-cols-[40%_40%_auto] sm:gap-4 place-items-end"
										>
											<TextField
												fullWidth
												value={email.name}
												variant="outlined"
												margin="normal"
												size="small"
												label="Nombre"
												onChange={(e) => onEmailChange(email.id!, 'name', e.target.value)}
											/>
											<TextField
												fullWidth
												variant="outlined"
												margin="normal"
												value={email.value}
												size="small"
												label="Correo electrónico"
												onChange={(e) => onEmailChange(email.id!, 'value', e.target.value)}
											/>
											<Button
												color="error"
												size="small"
												onClick={() => removeEmailItem(email.id!)}
												variant="contained"
												sx={{ height: 40, mb: 1, mr: 'auto' }}
											>
												<DeleteOutline />
											</Button>
										</div>
									))}
									<Button startIcon={<AddOutlined />} onClick={addEmailItem}>
										Nuevo correo
									</Button>
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
