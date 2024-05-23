import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
	{ field: 'name', headerName: 'Nombre', width: 150, headerAlign: 'center', align: 'center' },
	{
		field: 'start_time',
		headerName: 'Hora inicio',
		width: 100,
		align: 'center',
		headerAlign: 'center'
	},
	{ field: 'end_time', headerName: 'Hora fin', width: 100, align: 'center', headerAlign: 'center' },
	{
		field: 'description',
		headerName: 'Descripción',
		align: 'center',
		headerAlign: 'center',
		width: 400
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
					sx={{ borderColor: 'transparent' }}
					onRowClick={(row) => {
						viewDetail(row.row)
					}}
					rows={[
						{
							id: 1,
							name: 'Turno A',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							description:
								'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						},
						{
							id: 2,
							name: 'Turno B',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							description:
								'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						},
						{
							id: 3,
							name: 'Turno C',
							date: '2022-04-17',
							start_time: '15:30',
							end_time: '17:30',
							description:
								'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						}
					]}
				/>
			</div>
		</div>
	)
}
