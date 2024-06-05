import {
	Button,
	Card,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Tooltip
} from '@mui/material'
import EnlonadosDataGrid from './enlonados-data-grid'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { enlonadosActions } from '@/redux/reducers/enlonados'
import {
	ENLONADO_PAYMENT_METHOD,
	EnlonadosFilterOptions,
	FLAT_TYPE
} from '@/redux/reducers/enlonados/types'
import useQueryParams from '@/hooks/useQuery'
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { companyActions } from '@/redux/reducers/companies'
import { UserRoles } from '@/redux/reducers/users/types'

type FormDataProps = {
	manager_id?: string | null
	start_date?: Dayjs | null
	end_date?: Dayjs | null
	flat_type?: string | null
	payment_method?: string | null
	company_id?: string | null
	folio?: string | null
	plate?: string | null
}

const initialFormData: FormDataProps = {
	start_date: null,
	end_date: null,
	flat_type: '',
	payment_method: '',
	manager_id: '',
	company_id: '',
	folio: '',
	plate: ''
}

const MAX_RECORDS = 1000

const EnlonadosPage = () => {
	const dispatch = useAppDispatch()
	const query = useQueryParams()
	const { enlonados = [], loading } = useAppSelector((state) => state.enlonados)
	const { data: users = [], user_auth } = useAppSelector((state) => state.users)
	const { companies = [] } = useAppSelector((state) => state.companies)
	const [formData, setFormData] = useState<FormDataProps>(initialFormData)
	const firstRender = useRef(false)
	const isAdmin = user_auth?.user?.is_admin

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(enlonadosActions.fetchEnlonados())
			dispatch(companyActions.fetchCompanies())
		}
	}, [dispatch, firstRender])

	useMemo(() => {
		if (query.get('manager_id'))
			setFormData((prev) => ({ ...prev, manager_id: query.get('manager_id') }))
		if (query.get('start_date'))
			setFormData((prev) => ({ ...prev, start_date: dayjs(query.get('start_date')) }))
		if (query.get('end_date'))
			setFormData((prev) => ({ ...prev, end_date: dayjs(query.get('end_date')) }))
		if (query.get('flat_type'))
			setFormData((prev) => ({ ...prev, flat_type: query.get('flat_type') }))
		if (query.get('payment_method'))
			setFormData((prev) => ({ ...prev, payment_method: query.get('payment_method') }))
		if (query.get('company_id'))
			setFormData((prev) => ({ ...prev, company_id: query.get('company_id') }))
		if (query.get('folio')) setFormData((prev) => ({ ...prev, folio: query.get('folio') }))
		if (query.get('plate')) setFormData((prev) => ({ ...prev, plate: query.get('plate') }))
	}, [query.queryParams])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (!!value) query.set(name, value)
		else query.remove(name)
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (e: SelectChangeEvent<string>, _: ReactNode) => {
		const { name, value } = e.target
		if (!!value) query.set(name, value)
		else query.remove(name)
		setFormData((prev) => ({ ...prev, [name || '']: value as string }))
	}

	const handleDayjsChange = (date: Dayjs | null, fieldName: string) => {
		if (!!date) query.set(fieldName, date.format('YYYY-MM-DD'))
		else query.remove(fieldName)
		setFormData((prev) => ({ ...prev, [fieldName]: date }))
	}

	const existAnyFilter = useMemo(() => {
		return Object.values(formData).some((value) => !!value)
	}, [formData])

	const clearFilters = () => {
		query.removeAll()
		setFormData(initialFormData)
		dispatch(enlonadosActions.fetchEnlonados())
	}

	const onSearch = (pagination?: GridPaginationModel | GridSortModel) => {
		let filter: EnlonadosFilterOptions = {
			manager_id: formData.manager_id || null,
			start_date: formData.start_date?.format('YYYY-MM-DD') || null,
			end_date: formData.end_date?.format('YYYY-MM-DD') || null,
			flat_type: formData.flat_type || null,
			payment_method: formData.payment_method || null,
			company_id: formData.company_id || null,
			folio: formData.folio || null,
			plate: formData.plate || null,
			page: (pagination as GridPaginationModel)?.page,
			field: (pagination as GridSortModel)[0]?.field || 'date',
			sort: (pagination as GridSortModel)[0]?.sort || 'asc'
		}
		dispatch(enlonadosActions.fetchEnlonados(filter))
	}

	const onDownload = async (pagination?: GridPaginationModel) => {
		let filter: EnlonadosFilterOptions = {
			manager_id: formData.manager_id || null,
			start_date: formData.start_date?.format('YYYY-MM-DD') || null,
			end_date: formData.end_date?.format('YYYY-MM-DD') || null,
			flat_type: formData.flat_type || null,
			payment_method: formData.payment_method || null,
			company_id: formData.company_id || null,
			folio: formData.folio || null,
			plate: formData.plate || null,
			page: pagination?.page
		}
		await dispatch(enlonadosActions.fetchEnlonadosCSV(filter))
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Enlonados"
				current="Enlonados"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
			>
				{isAdmin && (
					<Grid item xs={6} sm={6} md={6} lg={2}>
						<FormControl fullWidth>
							<InputLabel id="manager_id-label" sx={{ marginTop: '-7px' }}>
								Encargado
							</InputLabel>
							<Select
								size="small"
								labelId="manager_id-label"
								id="manager_id-select"
								value={formData.manager_id || ''}
								name="manager_id"
								onChange={handleSelectChange}
								label="Encargado"
							>
								{(users || [])
									?.filter((u) =>
										[UserRoles.ADMIN, UserRoles.MANAGER].includes(u?.role as UserRoles)
									)
									?.map((user) => (
										<MenuItem key={user?.user_id} value={user?.user_id}>
											{user?.name + ' ' + user?.surnames}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Grid>
				)}
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<MobileDatePicker
						label="Fecha inicio"
						value={formData.start_date}
						onChange={(date) => handleDayjsChange(date, 'start_date')}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<MobileDatePicker
						label="Fecha fin"
						value={formData.end_date}
						onChange={(date) => handleDayjsChange(date, 'end_date')}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<FormControl fullWidth>
						<InputLabel id="flat_type-label" sx={{ marginTop: '-7px' }}>
							Tipo de plana
						</InputLabel>
						<Select
							size="small"
							labelId="flat_type-label"
							id="flat_type-select"
							value={formData.flat_type || ''}
							name="flat_type"
							onChange={handleSelectChange}
							label="Tipo de plana"
						>
							<MenuItem value={FLAT_TYPE.SIMPLE}>Sencilla</MenuItem>
							<MenuItem value={FLAT_TYPE.FULL}>Full</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<FormControl fullWidth>
						<InputLabel id="payment_method-label" sx={{ marginTop: '-7px' }}>
							Método de pago
						</InputLabel>
						<Select
							size="small"
							labelId="payment_method-label"
							id="payment_method-select"
							label="Método de pago"
							value={formData.payment_method || ''}
							name="payment_method"
							onChange={handleSelectChange}
						>
							<MenuItem value={ENLONADO_PAYMENT_METHOD.CASH}>Efectivo</MenuItem>
							<MenuItem value={ENLONADO_PAYMENT_METHOD.TRANSFER}>Transferencia</MenuItem>
							<MenuItem value={ENLONADO_PAYMENT_METHOD.CREDIT}>Crédito</MenuItem>
							<MenuItem value={ENLONADO_PAYMENT_METHOD.PENDING}>Pendiente</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<FormControl fullWidth>
						<InputLabel id="company_id-label" sx={{ marginTop: '-7px' }}>
							Empresa
						</InputLabel>
						<Select
							size="small"
							labelId="company_id-label"
							id="company_id-select"
							value={formData.company_id || ''}
							name="company_id"
							onChange={handleSelectChange}
							label="Tipo de plana"
						>
							{(companies || [])?.map((company) => (
								<MenuItem key={company.company_id} value={company.company_id}>
									{company.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<TextField
						name="folio"
						value={formData.folio}
						label="Folio"
						size="small"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={2}>
					<TextField
						name="plate"
						value={formData.plate}
						label="Placa"
						size="small"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={6}>
					<FormControl fullWidth>
						<InputLabel> </InputLabel>
						<div className="flex gap-4 justify-end w-full flex-row-reverse lg:flex-row">
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => onSearch({} as GridPaginationModel)}
								disabled={loading || !existAnyFilter}
							>
								{loading ? 'Cargando...' : 'Buscar'}
							</Button>

							<Button
								onClick={clearFilters}
								fullWidth
								variant="contained"
								color="error"
								disabled={loading || !existAnyFilter}
							>
								<FilterAltOffOutlinedIcon />
							</Button>

							{isAdmin && (
								<Tooltip title={`Puedes descargar máximo ${MAX_RECORDS} registros`}>
									<Button
										onClick={() => onDownload()}
										fullWidth
										variant="contained"
										color="success"
										sx={{ color: 'white' }}
										disabled={loading || !enlonados.length || enlonados?.length > MAX_RECORDS}
									>
										{loading ? 'Cargando...' : 'Descargar CSV'}
									</Button>
								</Tooltip>
							)}
						</div>
					</FormControl>
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<EnlonadosDataGrid
						data={enlonados || []}
						loading={loading}
						onPaginationChange={onSearch}
					/>
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosPage
