import { useAppSelector } from '@/hooks/useStore'
import { User } from '@/redux/reducers/users/types'
import {
	Avatar,
	Card,
	CircularProgress,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material'
import { Fragment } from 'react/jsx-runtime'

type Props = {
	data?: User[]
}

const BoxStats = ({ title = '', value = '' }: { title?: string; value?: string | number }) => {
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Card sx={{ width: '100%' }}>
				<div className={`px-2 py-4 flex flex-col-reverse lg:flex-col lg:justify-between w-full`}>
					<span className="font-medium text-center text-3xl mb-3">{value || 0}</span>
					<span className="text-sm text-center text-slate-500 font-light">{title}</span>
				</div>
			</Card>
		</Grid>
	)
}

const FlatsByManagerDataGrid = ({ data }: Props) => {
	const { flats_per_manager, loading } = useAppSelector((state) => state.reports)
	const { groupedData } = flats_per_manager

	return (
		<div className="relative flex gap-4 flex-col-reverse md:flex-row">
			<Grid container sm={12} md={6} lg={6} spacing={2}>
				<BoxStats title="Total en efectivo" value={groupedData?.finalTotal?.cash} />
				<BoxStats title="Total en créditos" value={groupedData?.finalTotal?.credits} />
				<BoxStats title="Total" value={groupedData?.finalTotal?.value} />
			</Grid>

			<Grid container xs={12} md={6} lg={6}>
				<Card sx={{ width: '100%', height: 'min-content' }}>
					<div className={`px-0 flex flex-col-reverse lg:flex-col lg:justify-between w-full`}>
						<List sx={{ padding: 0, width: '100%' }}>
							{data?.map((user) => {
								const record = groupedData?.[user?.user_id]
								return (
									<Fragment key={user?.user_id}>
										<ListItem
											alignItems="flex-start"
											sx={{ display: 'flex', justifyContent: 'center', margin: 0 }}
										>
											<ListItemAvatar sx={{ marginY: 'auto' }}>
												<Avatar sx={{ width: 30, height: 30, fontSize: 14 }}>
													{(user?.name[0] || '') + (user?.surnames ? user?.surnames[0] : '')}
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<span className="text-slate-800 font-normal text-base">
														{user?.name + ' ' + user?.surnames}
													</span>
												}
												secondary={
													<div className="grid grid-cols-3 gap-1 pt-1">
														<span className="font-thin text-slate-500">
															Efectivo:{' '}
															<strong className="font-normal">{record?.totalCash || 0}</strong>
														</span>
														<span className="font-thin text-slate-500">
															Créditos:{' '}
															<strong className="font-normal">{record?.totalCredits || 0}</strong>
														</span>
														<span className="font-thin text-slate-500">
															Total: <strong className="font-normal">{record?.total || 0}</strong>
														</span>
													</div>
												}
											/>
										</ListItem>
										<Divider />
									</Fragment>
								)
							})}
						</List>
					</div>

					{loading && (
						<div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
							<CircularProgress />
						</div>
					)}
				</Card>
			</Grid>
		</div>
	)
}

export default FlatsByManagerDataGrid
