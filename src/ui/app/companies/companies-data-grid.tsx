import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Avatar, Button, Typography } from '@mui/material'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import useQuery from '@/hooks/useQuery'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import DeleteDialog from '@/ui/common/delete-dialog'
import { Company } from '@/redux/reducers/companies/types'
import { companyActions } from '@/redux/reducers/companies'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import { CustomNoRowsOverlay } from '@/ui/common/data-grid-overlays'

const columns: GridColDef<Company>[] = [
	// { field: 'user_id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
	{
		field: 'name',
		headerName: 'Nombre',
		width: 380,
		renderCell: ({ row = {} }) => (
			<div className="flex gap-2 items-center h-full">
				<Avatar sx={{ width: 35, height: 35, fontSize: 14, padding: 1 }}>
					<BusinessOutlinedIcon sx={{ width: 20, height: 20 }} />
				</Avatar>{' '}
				<Typography>{row?.name || '- - -'}</Typography>
			</div>
		)
	},
	{ field: 'phone', headerName: 'Teléfono', width: 150 },
	{ field: 'description', headerName: 'Descripción', width: 250 },
	{
		field: 'user_id',
		headerName: 'Acciones',
		width: 350,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row = {} as Company }) => (
			<div className="flex justify-center gap-3 items-center h-full">
				<Link to={APP_ROUTES.APP.COMPANIES.EDIT.hash`${row.company_id!}`}>
					<Button variant="contained" color="warning">
						<EditOutlined sx={{ color: 'white' }} />
					</Button>
				</Link>
				<Link to={APP_ROUTES.APP.COMPANIES.path + `?company_id=${row.company_id}`}>
					<Button variant="contained" color="error">
						<DeleteOutline />
					</Button>
				</Link>
			</div>
		)
	}
]

export default function CompaniesDataGrid({ data }: { data?: Company[] }) {
	const query = useQuery()
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.companies)
	const company_id = query.get('company_id')

	const onClose = () => {
		query.remove('company_id')
	}

	const onDelete = async () => {
		if (!company_id) return
		const result = await dispatch(companyActions.changeStatusCompany(company_id!, false))
		if (result) {
			toast.success('Empresa eliminada con éxito')
			onClose()
			return
		}

		toast.error('Error al eliminar registro')
	}

	return (
		<div style={{ width: '100%' }}>
			<div style={{ width: '100%' }}>
				<DataGrid
					columns={columns}
					sx={{ borderColor: 'transparent' }}
					rows={data || []}
					getRowId={(row) => row.company_id}
					disableRowSelectionOnClick
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10
							}
						}
					}}
					slots={{
						noRowsOverlay: CustomNoRowsOverlay,
						noResultsOverlay: CustomNoRowsOverlay
					}}
				/>
			</div>

			<DeleteDialog onClose={onClose} open={!!company_id} onConfirm={onDelete} loading={loading} />
		</div>
	)
}
