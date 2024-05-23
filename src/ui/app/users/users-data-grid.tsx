import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Avatar, Typography } from '@mui/material'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
	{ field: 'name', headerName: 'Nombre', width: 150 },
	{ field: 'last_name', headerName: 'Apellido', width: 150 },
	{
		field: 'email',
		headerName: 'Correo',
		width: 250,
		renderCell: (params) => (
			<div className="flex gap-2 items-center h-full">
				<Avatar sx={{ width: 30, height: 30, fontSize: 14 }}>
					{params.value ? params.value[0] : 'U'}
				</Avatar>{' '}
				<Typography>{params.value || '- - -'}</Typography>
			</div>
		)
	},
	{ field: 'phone', headerName: 'Teléfono', width: 150 },
	{ field: 'address', headerName: 'Dirección', width: 150 }
]

export default function UsersDataGrid() {
	return (
		<div style={{ width: '100%' }}>
			<div style={{ height: 350, width: '100%' }}>
				<DataGrid
					columns={columns}
					sx={{ borderColor: 'transparent' }}
					rows={[
						{
							id: 1,
							name: 'Juanito',
							last_name: 'Pérez',
							email: 'juanito@email.com',
							phone: '7714152997',
							address: 'Caxuxi Hgo'
						},
						{
							id: 2,
							name: 'Pepito',
							last_name: 'Pérez',
							email: 'pablito@email.com',
							phone: '7714152997',
							address: 'Caxuxi Hgo'
						},
						{
							id: 3,
							name: 'Juanito',
							last_name: 'Pérez',
							email: '',
							phone: '7714152997',
							address: 'Caxuxi Hgo'
						}
					]}
				/>
			</div>
		</div>
	)
}
