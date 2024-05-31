import { GridOverlay } from '@mui/x-data-grid'
import FastDeliveryWebp from '@/assets/not-found.svg'

export const CustomNoRowsOverlay = () => {
	return (
		<GridOverlay>
			<div className="h-full my-auto flex flex-col justify-center items-center">
				<img src={FastDeliveryWebp} alt="Fast delivery" className="h-40 w-auto" />
				<h5 className="text-lg text-slate-500">No hay información para mostrar</h5>
			</div>
		</GridOverlay>
	)
}

export const CustomNoResultsOverlay = () => {
	return (
		<GridOverlay>
			<div className="h-full my-auto flex flex-col justify-center items-center">
				<img src={FastDeliveryWebp} alt="Fast delivery" className="h-40 w-auto" />
				<h5 className="text-lg text-slate-500">No hay información para mostrar</h5>
			</div>
		</GridOverlay>
	)
}
