import { useAppSelector } from '@/hooks/useStore'
import { User } from '@/redux/reducers/users/types'
import { Avatar, Card, CircularProgress, Typography } from '@mui/material'
import { useState } from 'react'
import FiltersSvg from '@/assets/filters.svg'

type Props = {
	data?: User[]
}

const getHeaderTextSize = (userList: User[]) => {
	if (userList?.length > 5) {
		return 'text-[11px]'
	}

	if (userList?.length > 3) {
		return 'text-xs'
	}

	return 'text-sm'
}

const cellIsActive = (cell: number[] | null, active: number[] | null) => {
	return !!(cell && active && cell[0] === active[0] && cell[1] === active[1])
}

type DataGridCellProps = {
	value?: string | number | null
	active?: boolean
	onClick?: () => void
	className?: string
}

const DataGridCell = ({
	active = false,
	className = '',
	onClick,
	value = 0
}: DataGridCellProps) => {
	return (
		<div
			onClick={onClick}
			className={`text-sm font-normal text-center py-2 text-slate-600 border-r ${
				active ? 'bg-green-300/30' : ''
			} ${className} select-none cursor-ponter w-full`}
		>
			{value}
		</div>
	)
}

const FilterMessage = () => (
	<div className="p-6 flex flex-col text-center">
		<img src={FiltersSvg} alt="filters" className="w-60 h-60 mx-auto mb-3" />
		<Typography variant="body1">Utiliza los filtros para mostrar información</Typography>
	</div>
)

const FlatsByManagerDataGrid = ({ data }: Props) => {
	const [cellActive, setCellActive] = useState<number[] | null>(null)
	const { flats_per_manager, loading } = useAppSelector((state) => state.reports)
	const { users = [], weeksNumber = [], groupedData } = flats_per_manager

	const onCheckCell = (cell: number[]) => {
		if (cellActive && cell[0] === cellActive[0] && cell[1] === cellActive[1]) {
			setCellActive(null)
		} else {
			setCellActive(cell)
		}
	}

	return (
		<Card sx={{ position: 'relative', border: '1px solid rgba(203,213, 225,0.7)' }}>
			{!!users?.length ? (
				<div className={`px-0 flex flex-col overflow-x-auto lg:overscroll-x-none`}>
					<div className="w-full flex box-border">
						<header className="flex justify-center items-center min-w-[80px] max-w-[80px] h-[80px] box-border bg-slate-300/20 border-r">
							<h6 className="text-sm text-center">Semanas ({weeksNumber?.length})</h6>
						</header>
						{data?.map((user) => (
							<header
								key={user.user_id}
								className={`flex flex-col min-w-[300px] max-w-[300px] lg:min-w-[initial] lg:max-w-[initial] lg:w-full box-border bg-slate-300/20 border-r`}
							>
								<div className="w-full flex flex-col box-border">
									<div className="w-full h-[45px] flex items-center justify-center gap-2 border-b box-border">
										<Avatar
											sx={{ width: 20, height: 20, fontSize: 12 }}
											alt={user.name}
											src={`/static/images/avatar/${user.name}.jpg`}
										/>
										<Typography variant="body2">{user.name}</Typography>
									</div>
									<div className="grid grid-cols-3 place-content-center h-[35px] box-border">
										<h5 className={`font-medium ${getHeaderTextSize(data)} text-center w-full`}>
											Efectivo
										</h5>
										<h5
											className={`font-medium ${getHeaderTextSize(
												data
											)} text-center w-full border-x`}
										>
											Creditos
										</h5>
										<h5 className={`font-medium ${getHeaderTextSize(data)} text-center w-full`}>
											Total
										</h5>
									</div>
								</div>
							</header>
						))}
						<header className="flex justify-center items-center min-w-[80px] max-w-[80px] h-[80px] box-border bg-slate-300/20">
							<h6 className="text-sm">Total</h6>
						</header>
					</div>

					<div className={`w-full box-border border-t`}>
						{weeksNumber?.length ? (
							<>
								{weeksNumber?.map((weekId) => (
									<div
										key={weekId}
										className="grid box-border border-b hover:bg-slate-300/20"
										style={{ gridTemplateColumns: `80px repeat(${data?.length}, 1fr) 80px` }}
									>
										<DataGridCell
											value={`S${weekId}`}
											className="min-w-[80px] max-w-[80px] bg-slate-300/20"
										/>
										{data?.map((user) => {
											let weekData = groupedData![user?.user_id]?.[weekId] ?? {}
											return (
												<div
													key={user.user_id}
													className={`grid grid-cols-3 h-full min-w-[300px] max-w-[300px] lg:min-w-[initial] lg:max-w-[initial] box-border`}
												>
													<DataGridCell
														value={weekData?.cash || 0}
														onClick={() => onCheckCell([1, weekId])}
														active={cellIsActive([1, weekId], cellActive)}
													/>
													<DataGridCell
														value={weekData?.credits || 0}
														onClick={() => onCheckCell([2, weekId])}
														active={cellIsActive([2, weekId], cellActive)}
													/>
													<DataGridCell
														value={weekData?.total || 0}
														onClick={() => onCheckCell([3, weekId])}
														active={cellIsActive([3, weekId], cellActive)}
													/>
												</div>
											)
										})}
										<div
											className={`text-sm font-normal text-center py-2 text-slate-600 bg-slate-300/20`}
										>
											{groupedData?.totalsByWeek[weekId]?.total || 0}
										</div>
									</div>
								))}
							</>
						) : (
							<FilterMessage />
						)}
					</div>
				</div>
			) : (
				<FilterMessage />
			)}
			{loading && (
				<div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
					<CircularProgress />
				</div>
			)}
		</Card>
	)
}

export default FlatsByManagerDataGrid
