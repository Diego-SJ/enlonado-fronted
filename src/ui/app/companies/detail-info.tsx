import { useAppSelector } from '@/hooks/useStore'
import { ENLONADO_PAYMENT_METHOD, PAYMENT_METHOD_TEXT } from '@/redux/reducers/enlonados/types'
import { Divider, Grid, Skeleton } from '@mui/material'
import { ReactNode } from 'react'
import Chip from '@/ui/common/chip'

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

const CompanyInfoPanel = () => {
	const { company, loading } = useAppSelector((state) => state.companies)

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={6} md={3}>
					<ItemDetail loading={loading} title="Nombre corto" value={company?.name} />
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail
						loading={loading}
						title="Razón social"
						value={company?.social_reason || '- - -'}
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail
						loading={loading}
						title="Teléfono principal"
						value={company?.phone || '- - -'}
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<ItemDetail
						loading={loading}
						title="Método de pago"
						value={
							<Chip
								label={PAYMENT_METHOD_TEXT[company?.payment_method as any] || 'No especificado'}
								color={company?.payment_method === ENLONADO_PAYMENT_METHOD.CASH ? 'lime' : 'amber'}
							/>
						}
					/>
				</Grid>
				<Divider />
				{!!company?.contact_info?.phones?.length && (
					<>
						<Grid item xs={12} lg={6}>
							<ItemDetail
								loading={loading}
								title="Otros teléfonos"
								value={
									<div className="flex gap-2 flex-wrap flex-col">
										{company?.contact_info?.phones?.map((item) => (
											<div className="flex">
												<div className="text-slate-500">{item.name}: </div>
												<div className="text-slate-700 ml-2">{item.value}</div>
											</div>
										))}
									</div>
								}
							/>
						</Grid>
					</>
				)}
				{!!company?.contact_info?.emails?.length && (
					<>
						<Grid item xs={12} lg={6}>
							<ItemDetail
								loading={loading}
								title="Correos electrónicos"
								value={
									<div className="flex gap-2 flex-wrap w-full flex-col">
										{company?.contact_info?.emails?.map((item) => (
											<div className="flex">
												<div className="text-slate-500">{item.name}: </div>
												<div className="text-slate-700 ml-2">{item.value}</div>
											</div>
										))}
									</div>
								}
							/>
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<ItemDetail
						loading={loading}
						title="Observaciones"
						value={company?.description || '- - -'}
					/>
				</Grid>
			</Grid>
		</>
	)
}

export default CompanyInfoPanel
