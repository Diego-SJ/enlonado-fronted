import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import { Team } from '@/redux/reducers/users/types'
import { Button, Chip } from '@mui/material'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import useQueryParams from '@/hooks/useQuery'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { toast } from 'react-toastify'
import DeleteDialog from '@/ui/common/delete-dialog'
import { CustomNoRowsOverlay } from '@/ui/common/data-grid-overlays'

const columns: GridColDef<Team>[] = [
	{
		field: 'name',
		headerName: 'Nombre del equipo',
		width: 250,
		align: 'center',
		headerAlign: 'center',
		renderCell: ({ row }) => {
			return <div className="h-full grid place-content-center">{row.name}</div>
		}
	},
	{
		field: 'users',
		headerName: 'Encargado',
		width: 250,
		align: 'center',
		headerAlign: 'center',
		renderCell: ({ row }) => {
			return (
				<div className="h-full grid place-content-center">
					{row.users?.name + ' ' + row.users?.surnames}
				</div>
			)
		}
	},
	{
		field: 'team_members',
		headerName: 'Integrantes',
		align: 'center',
		headerAlign: 'center',
		width: 400,
		renderCell: ({ row }) => {
			return (
				<div className="flex gap-2 h-full w-full items-center justify-center flex-wrap py-2">
					{row.team_members?.list?.map((member) => (
						<Chip size="small" label={member.fullname} key={member?.user_id} />
					))}
				</div>
			)
		}
	},
	{
		field: 'team_id',
		headerName: 'Acciones',
		width: 350,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row = {} as Team }) => (
			<div className="flex justify-center gap-3 items-center h-full py-2">
				<Link to={APP_ROUTES.APP.WORK_SHIFTS.EDIT.hash`${row.team_id!}`}>
					<Button variant="contained" color="warning">
						<EditOutlined sx={{ color: 'white' }} />
					</Button>
				</Link>
				<Link to={APP_ROUTES.APP.WORK_SHIFTS.path + `?team_id=${row.team_id}`}>
					<Button variant="contained" color="error">
						<DeleteOutline />
					</Button>
				</Link>
			</div>
		)
	}
]

export default function EnlonadosDataGrid({ data }: { data?: Team[] }) {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.users)
	const query = useQueryParams()
	const team_id = query.get('team_id')

	const onClose = () => {
		query.remove('team_id')
	}

	const onDelete = async () => {
		if (!team_id) return
		const result = await dispatch(userActions.changeStatusTeam(team_id!, false))
		if (result) {
			toast.success('Equipo eliminado con éxito')
			onClose()
			return
		}

		toast.error('Error al eliminar registro')
	}

	return (
		<div style={{ width: '100%', height: data?.length ? '' : '500px' }}>
			<DataGrid
				columns={columns}
				sx={{ borderColor: 'transparent' }}
				getRowId={(row) => row.team_id}
				rows={data || []}
				getRowHeight={() => 'auto'}
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

			<DeleteDialog onClose={onClose} open={!!team_id} onConfirm={onDelete} loading={loading} />
		</div>
	)
}
