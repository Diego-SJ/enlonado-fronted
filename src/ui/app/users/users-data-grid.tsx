import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Avatar, Button, Typography } from '@mui/material'
import { ROLE_NAME, User, UserRoles } from '@/redux/reducers/users/types'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import useQuery from '@/hooks/useQuery'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import DeleteDialog from '@/ui/common/delete-dialog'
import { CustomNoRowsOverlay } from '@/ui/common/data-grid-overlays'
import Chip from '@/ui/common/chip'

const columns: GridColDef<User>[] = [
	// { field: 'user_id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
	{
		field: 'name',
		headerName: 'Nombre',
		width: 380,
		renderCell: ({ row = {} }) => (
			<div className="flex gap-2 items-center h-full">
				<Avatar sx={{ width: 30, height: 30, fontSize: 14 }}>
					{row?.name ? row?.name[0] : 'U'}
				</Avatar>{' '}
				<Typography>{row?.name + ' ' + row?.surnames || '- - -'}</Typography>
			</div>
		)
	},
	{ field: 'username', headerName: 'Usuario', width: 150 },
	{ field: 'phone', headerName: 'Teléfono', width: 150 },
	{
		field: 'role',
		headerName: 'Rol',
		width: 150,
		align: 'center',
		headerAlign: 'center',
		renderCell: ({ row = {} }) => {
			let color = {
				[UserRoles.ADMIN]: 'sky',
				[UserRoles.MANAGER]: 'lime',
				[UserRoles.SUPPORT]: 'amber'
			}[row.role as UserRoles]

			let rolename = ROLE_NAME[row.role as UserRoles]

			return <Chip label={rolename} color={color as any} />
		}
	},
	{
		field: 'user_id',
		headerName: 'Acciones',
		width: 350,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row = {} as User }) => (
			<div className="flex justify-center gap-3 items-center h-full">
				<Link to={APP_ROUTES.APP.USERS.EDIT.hash`${row.user_id!}`}>
					<Button variant="contained" color="warning">
						<EditOutlined sx={{ color: 'white' }} />
					</Button>
				</Link>
				<Link to={APP_ROUTES.APP.USERS.path + `?user_id=${row.user_id}`}>
					<Button variant="contained" color="error">
						<DeleteOutline />
					</Button>
				</Link>
			</div>
		)
	}
]

export default function UsersDataGrid({ data }: { data?: User[] }) {
	const query = useQuery()
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.users)
	const user_id = query.get('user_id')

	const onClose = () => {
		query.remove('user_id')
	}

	const onDelete = async () => {
		if (!user_id) return
		const result = await dispatch(userActions.deleteUser(user_id!))
		if (result) {
			toast.success('Usuario eliminado con éxito')
			onClose()
			return
		}

		toast.error('Error al eliminar usuario')
	}

	return (
		<div style={{ width: '100%', height: data?.length ? '' : '500px' }}>
			<DataGrid
				columns={columns}
				sx={{ borderColor: 'transparent' }}
				rows={data || []}
				getRowId={(row) => row.user_id}
				disableRowSelectionOnClick
				slots={{
					noRowsOverlay: CustomNoRowsOverlay,
					noResultsOverlay: CustomNoRowsOverlay
				}}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10
						}
					}
				}}
			/>

			<DeleteDialog onClose={onClose} open={!!user_id} onConfirm={onDelete} loading={loading} />
		</div>
	)
}
