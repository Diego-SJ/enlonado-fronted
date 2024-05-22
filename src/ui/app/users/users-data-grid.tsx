import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{ field: 'name', headerName: 'Nombre', width: 150 },
	{ field: 'last_name', headerName: 'Apellido', width: 150 },
	{ field: 'email', headerName: 'Correo', width: 150 },
	{ field: 'phone', headerName: 'Teléfono', width: 150 },
	{ field: 'address', headerName: 'Dirección', width: 150 }
]

export default function UsersDataGrid() {
	return (
		<div style={{ width: '100%' }}>
			<div style={{ height: 350, width: '100%' }}>
				<DataGrid
					columns={columns}
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
							email: '',
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
