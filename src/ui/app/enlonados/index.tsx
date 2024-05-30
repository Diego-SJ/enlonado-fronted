import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import EnlonadosDataGrid from './enlonados-data-grid'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useEffect, useRef } from 'react'
import { enlonadosActions } from '@/redux/reducers/enlonados'

const EnlonadosPage = () => {
	const dispatch = useAppDispatch()
	const { enlonados = [] } = useAppSelector((state) => state.enlonados)
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(enlonadosActions.fetchEnlonados())
		}
	}, [dispatch, firstRender])

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Enlonados"
				current="Enlonados"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
			>
				<Grid item xs={12} sm={12} md={4}>
					<TextField label="Buscar por colaborador, empresa o placas" fullWidth size="small" />
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<MobileDatePicker
						label="Fecha inicio"
						defaultValue={dayjs()}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<MobileDatePicker
						label="Fecha fin"
						defaultValue={dayjs()}
						slotProps={{ textField: { size: 'small', fullWidth: true } }}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<FormControl fullWidth>
						<InputLabel id="flat-type-label" sx={{ marginTop: '-7px' }}>
							Tipo de plana
						</InputLabel>
						<Select
							size="small"
							labelId="flat-type-label"
							id="flat-type-select"
							label="Tipo de plana"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<FormControl fullWidth>
						<InputLabel id="payment-method-label" sx={{ marginTop: '-7px' }}>
							Método de pago
						</InputLabel>
						<Select
							size="small"
							labelId="payment-method-label"
							id="payment-method-select"
							label="Método de pago"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<EnlonadosDataGrid data={enlonados || []} />
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosPage
