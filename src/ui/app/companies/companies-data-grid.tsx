import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Avatar, Button, Typography } from '@mui/material'
import { DeleteOutline, EditOutlined, RemoveRedEye } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import useQuery from '@/hooks/useQuery'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import DeleteDialog from '@/ui/common/delete-dialog'
import { Company } from '@/redux/reducers/companies/types'
import { companyActions } from '@/redux/reducers/companies'
import { BusinessOutlined } from '@mui/icons-material'
import { CustomNoRowsOverlay } from '@/ui/common/data-grid-overlays'
import Chip from '@/ui/common/chip'
import { ENLONADO_PAYMENT_METHOD } from '@/redux/reducers/enlonados/types'
import { User } from '@/redux/reducers/users/types'

const columns = (user: User) =>
	[
		{
			field: 'name',
			headerName: 'Nombre',
			width: 380,
			renderCell: ({ row }) => (
				<div className="flex gap-2 items-center h-full">
					<Avatar sx={{ width: 35, height: 35, fontSize: 14, padding: 1 }}>
						<BusinessOutlined sx={{ width: 20, height: 20 }} />
					</Avatar>{' '}
					<Typography>{row?.name || '- - -'}</Typography>
				</div>
			)
		},
		{
			field: 'social_reason',
			headerName: 'Razón Social',
			width: 380,
			renderCell: ({ row }) => (
				<div className="flex gap-2 items-center h-full">
					<Typography>{row?.social_reason || '- - -'}</Typography>
				</div>
			)
		},
		{ field: 'phone', headerName: 'Teléfono principal', width: 150 },
		{
			field: 'payment_method',
			headerName: 'Método de pago',
			align: 'center',
			width: 150,
			headerAlign: 'center',
			renderCell: ({ value }) => {
				return (
					<Chip
						label={value === ENLONADO_PAYMENT_METHOD.CASH ? 'Efectivo' : 'Crédito'}
						color={value === ENLONADO_PAYMENT_METHOD.CASH ? 'lime' : 'amber'}
					/>
				)
			}
		},
		{
			field: 'user_id',
			headerName: 'Acciones',
			width: 350,
			headerAlign: 'center',
			align: 'center',
			renderCell: ({ row = {} as Company }) => (
				<div className="flex justify-center gap-3 items-center h-full">
					<Link to={APP_ROUTES.APP.COMPANIES.DETAIL.hash`${row.company_id!}`}>
						<Button variant="contained" color="success">
							<RemoveRedEye sx={{ color: 'white' }} />
						</Button>
					</Link>
					{user?.is_admin || user?.permissions?.companies?.edit_company ? (
						<Link to={APP_ROUTES.APP.COMPANIES.EDIT.hash`${row.company_id!}`}>
							<Button variant="contained" color="warning">
								<EditOutlined sx={{ color: 'white' }} />
							</Button>
						</Link>
					) : null}
					{user?.is_admin || user?.permissions?.companies?.delete_company ? (
						<Link to={APP_ROUTES.APP.COMPANIES.path + `?company_id=${row.company_id}`}>
							<Button variant="contained" color="error">
								<DeleteOutline />
							</Button>
						</Link>
					) : null}
				</div>
			)
		}
	] as GridColDef<Company>[]

export default function CompaniesDataGrid({ data }: { data?: Company[] }) {
	const query = useQuery()
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.companies)
	const { user } = useAppSelector(({ users }) => users?.user_auth)
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
		<div style={{ width: '100%', height: data?.length ? '' : '500px' }}>
			<DataGrid
				columns={columns(user as User)}
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

			<DeleteDialog onClose={onClose} open={!!company_id} onConfirm={onDelete} loading={loading} />
		</div>
	)
}
