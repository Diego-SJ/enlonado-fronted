import { useAppSelector } from '@/hooks/useStore'
import { Enlonado, FLAT_TYPE, PAYMENT_METHOD_TEXT } from '@/redux/reducers/enlonados/types'
import { Divider, Grid, Skeleton } from '@mui/material'
import { ReactNode } from 'react'
import { CHIP_COLOR_PM } from './enlonados-data-grid'
import Chip from '@/ui/common/chip'
import { dates } from '@/utils/dates'

const ItemDetail = ({
	title = '',
	value = '',
	loading = false
}: {
	title?: string
	value?: string | ReactNode
	loading?: boolean
}) => {
	return (
		<div className="flex flex-col">
			{' '}
			{loading ? (
				<>
					<Skeleton />
					<Skeleton animation="wave" />
				</>
			) : (
				<>
					<h5 className="font-semibold mb-2 text-slate-700">{title}</h5>
					<div className="inline-flex">
						{typeof value === 'string' ? (
							<span className="inline-flex text-slate-500"> {value}</span>
						) : (
							value
						)}
					</div>
				</>
			)}
		</div>
	)
}

const EnlonadoInfoPanel = () => {
	const { enlonado = {} as Enlonado, loading } = useAppSelector((state) => state.enlonados)

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={6} md={3}>
					<ItemDetail loading={loading} title="Encargado" value={enlonado?.users?.name} />
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail loading={loading} title="Folio" value={enlonado?.folio} />
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail loading={loading} title="Empresa" value={enlonado?.companies?.name} />
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail
						loading={loading}
						title="Método de pago"
						value={
							<Chip
								label={PAYMENT_METHOD_TEXT[enlonado?.payment_method as any] || 'No especificado'}
								color={CHIP_COLOR_PM[enlonado?.payment_method as any] || 'default'}
							/>
						}
					/>
				</Grid>
				<Divider />
				<Grid item xs={6} sm={3} md={3}>
					<ItemDetail loading={loading} title="Fecha" value={dates.fullDate(enlonado?.date)} />
				</Grid>
				<Grid item xs={6} sm={3} md={3}>
					<ItemDetail
						loading={loading}
						title="Hora inicio"
						value={dates.timeString(enlonado?.start_time)}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3}>
					<ItemDetail
						loading={loading}
						title="Hora fin"
						value={dates.timeString(enlonado?.end_time)}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3}>
					<ItemDetail
						loading={loading}
						title="Tiempo por plana"
						value={enlonado?.time_per_flat ? enlonado?.time_per_flat + ' m' : '- - -'}
					/>
				</Grid>

				<Grid item xs={6} sm={3}>
					<ItemDetail loading={loading} title="Placas" value={enlonado?.plate || '- - -'} />
				</Grid>
				<Grid item xs={6} sm={3}>
					<ItemDetail
						loading={loading}
						title="Tipo de plana"
						value={
							<Chip
								label={enlonado?.flat_type === FLAT_TYPE.FULL ? 'Full' : 'Sencilla'}
								color={enlonado?.flat_type === FLAT_TYPE.FULL ? 'lime' : 'amber'}
							/>
						}
					/>
				</Grid>
				<Grid item xs={6} sm={3}>
					<ItemDetail loading={loading} title="Plana 1" value={enlonado?.flat_1 || '- - -'} />
				</Grid>
				<Grid item xs={6} sm={3}>
					<ItemDetail loading={loading} title="Plana 2" value={enlonado?.flat_1 || '- - -'} />
				</Grid>
				{!!enlonado?.team_members?.list?.length && (
					<>
						<Grid item xs={12} lg={9}>
							<ItemDetail
								loading={loading}
								title="Integrantes del equipo"
								value={
									<div className="flex gap-2 flex-wrap">
										{enlonado?.team_members?.list?.map((p, i) => (
											<Chip key={i} label={p?.fullname || '- - -'} color="default" />
										))}
									</div>
								}
							/>
						</Grid>

						<Grid item xs={12} lg={3}>
							<ItemDetail
								loading={loading}
								title="Equipo"
								value={enlonado?.teams?.name || '- - -'}
							/>
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<ItemDetail
						loading={loading}
						title="Observaciones"
						value={enlonado?.comments || '- - -'}
					/>
				</Grid>
			</Grid>
		</>
	)
}

export default EnlonadoInfoPanel
