import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { blueGrey, deepPurple, green, lightBlue, pink } from '@mui/material/colors'
import { APP_ROUTES } from '@/routes/routes'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{ field: 'created_by', headerName: 'Registrado por', width: 150 },
	{ field: 'folio', headerName: 'Folio', width: 100, align: 'center' },
	{ field: 'date', headerName: 'Fecha', width: 100 },
	{ field: 'start_time', headerName: 'Hora inicio', width: 100, align: 'center' },
	{ field: 'end_time', headerName: 'Hora fin', width: 100, align: 'center' },
	{ field: 'stimated_time', headerName: 'Duración', width: 100, align: 'center' },
	{ field: 'company', headerName: 'Empresa', width: 140, align: 'center' },
	{ field: 'plates', headerName: 'Placas' },
	{
		field: 'flat_type',
		headerName: 'Tipo de plana',
		align: 'center',
		renderCell: (params) => {
			let color: { [key: string]: any } = {
				full: deepPurple.A200,
				simple: pink.A200
			}

			return (
				<Chip
					size="small"
					label={params.value === 'full' ? 'Full' : 'Sencillo'}
					variant="outlined"
					sx={{
						borderColor: color[params.value as string] || 'gray',
						color: color[params.value as string] || 'gray'
					}}
				/>
			)
		}
	},
	{
		field: 'payment_method',
		headerName: 'Forma de pago',
		width: 150,
		align: 'center',
		renderCell: (params) => {
			let text: { [key: string]: string } = {
				CASH: 'Efectivo',
				CARD: 'Tarjeta',
				TRANSFER: 'Transferencia'
			}

			let color: { [key: string]: any } = {
				CASH: green[600],
				CARD: blueGrey[500],
				TRANSFER: lightBlue[500]
			}
			return (
				<Chip
					size="small"
					label={text[params.value as string] || 'No especificado'}
					variant="outlined"
					sx={{
						borderColor: color[params.value as string] || 'gray',
						color: color[params.value as string] || 'gray'
					}}
				/>
			)
		}
	}
]

export default function EnlonadosDataGrid() {
	const navigate = useNavigate()

	const viewDetail = (row: any) => {
		navigate(APP_ROUTES.APP.ENLONADOS.DETAIL.hash`${row.id}`)
	}
	return (
		<div style={{ width: '100%' }}>
			<div style={{ height: 350, width: '100%' }}>
				<DataGrid
					columns={columns}
					onRowClick={(row) => {
						viewDetail(row.row)
					}}
					rows={[
						{
							id: 1,
							created_by: 'Juanito Pérez',
							folio: '123',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							stimated_time: '2 hrs',
							company: 'Empresa',
							plates: 'ABC-123',
							flat_type: 'full',
							payment_method: 'CASH',
							actions: 'Editar'
						},
						{
							id: 2,
							created_by: 'Juanito Pérez',
							folio: '123',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							stimated_time: '2 hrs',
							company: 'Empresa',
							plates: 'ABC-123',
							flat_type: 'full',
							payment_method: 'CARD',
							actions: 'Editar'
						},
						{
							id: 3,
							created_by: 'Juanito Pérez',
							folio: '123',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							stimated_time: '2 hrs',
							company: 'Empresa',
							plates: 'ABC-123',
							flat_type: 'simple',
							payment_method: 'TRANSFER',
							actions: 'Editar'
						}
					]}
				/>
			</div>
		</div>
	)
}
