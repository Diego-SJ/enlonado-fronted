import { DataGrid, GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'

import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import {
	ENLONADO_PAYMENT_METHOD,
	Enlonado,
	FLAT_TYPE,
	PAYMENT_METHOD_TEXT
} from '@/redux/reducers/enlonados/types'
import Chip from '@/ui/common/chip'
import dayjs from 'dayjs'
import { useAppSelector } from '@/hooks/useStore'
import { CustomNoRowsOverlay } from '@/ui/common/data-grid-overlays'
import { useState } from 'react'

export const CHIP_COLOR_PM: { [key: string]: any } = {
	[ENLONADO_PAYMENT_METHOD.CASH]: 'lime',
	[ENLONADO_PAYMENT_METHOD.CREDIT]: 'sky',
	[ENLONADO_PAYMENT_METHOD.PENDING]: 'yellow',
	[ENLONADO_PAYMENT_METHOD.TRANSFER]: 'violet'
}

const columns: GridColDef<Enlonado>[] = [
	{
		field: 'manager_id',
		headerName: 'Encargado',
		width: 200,
		renderCell: ({ row }) => {
			return row?.users?.name + ' ' + row?.users?.surnames
		}
	},
	{
		field: 'folio',
		headerName: 'Folio',
		width: 200,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }) => {
			return <Chip label={row.folio} color="default" />
		}
	},
	{
		field: 'company_id',
		headerName: 'Empresa',
		width: 200,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }) => {
			return row.companies?.name || '- - -'
		}
	},
	{
		field: 'date',
		headerName: 'Fecha',
		width: 170,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }: any) => {
			return row?.date ? dayjs(row?.date).format('D MMMM [de] YYYY') : '- - -'
		}
	},
	{
		field: 'start_time',
		headerName: 'Hora inicio',
		width: 120,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }: any) => {
			return row?.start_time || '- - -'
		}
	},
	{
		field: 'end_time',
		headerName: 'Hora fin',
		width: 120,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }: any) => {
			return row?.end_time || '- - -'
		}
	},

	{
		field: 'flat_type',
		headerName: 'Tipo de plana',
		align: 'center',
		width: 150,
		headerAlign: 'center',
		renderCell: ({ value }) => {
			return (
				<Chip
					label={value === FLAT_TYPE.FULL ? 'Full' : 'Sencillo'}
					color={value === FLAT_TYPE.FULL ? 'lime' : 'amber'}
				/>
			)
		}
	},
	{
		field: 'time_per_flat',
		headerName: 'Tiempo por plana',
		width: 150,
		headerAlign: 'center',
		align: 'center',
		renderCell: ({ row }) => {
			return `${row?.time_per_flat || 0} m`
		}
	},
	{
		field: 'payment_method',
		headerName: 'Forma de pago',
		width: 150,
		align: 'center',
		headerAlign: 'center',
		renderCell: (params) => {
			return (
				<Chip
					label={PAYMENT_METHOD_TEXT[params.value as string] || 'No especificado'}
					color={CHIP_COLOR_PM[params.value as string] || 'default'}
				/>
			)
		}
	}
]

type Props = {
	data?: Enlonado[]
	loading?: boolean
	onPaginationChange?: (paginationModel: GridPaginationModel | GridSortModel) => void
}

export default function EnlonadosDataGrid({
	data = [],
	loading = false,
	onPaginationChange = () => {}
}: Props) {
	const navigate = useNavigate()
	const { pagination } = useAppSelector((state) => state?.enlonados)
	const [sortModel, setSortModel] = useState<GridSortModel>([])

	const viewDetail = (row: Enlonado) => {
		navigate(APP_ROUTES.APP.ENLONADOS.DETAIL.hash`${row.enlonado_id}`)
	}

	return (
		<div style={{ width: '100%', height: data?.length ? '' : '500px' }}>
			<DataGrid
				loading={loading}
				columns={columns}
				sx={{ borderColor: 'transparent' }}
				onRowClick={(row) => {
					viewDetail(row.row)
				}}
				getRowId={(row) => row.enlonado_id}
				rows={data}
				onPaginationModelChange={(paginationModel) => {
					onPaginationChange(paginationModel)
				}}
				paginationMode="server"
				disableRowSelectionOnClick
				rowCount={pagination?.total || 0}
				paginationModel={{
					pageSize: pagination?.pageSize || 20,
					page: pagination?.page || 0
				}}
				sortModel={sortModel}
				sortingMode="server"
				onSortModelChange={(sortModel) => {
					setSortModel(sortModel)
					onPaginationChange(sortModel)
				}}
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableColumnMenu
				slots={{
					noRowsOverlay: CustomNoRowsOverlay,
					noResultsOverlay: CustomNoRowsOverlay
				}}
			/>
		</div>
	)
}
