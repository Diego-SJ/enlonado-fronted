import { useAppSelector } from '@/hooks/useStore'
import { Card, Grid } from '@mui/material'
import FlatsByManagerDataGrid from './data-grid'
import FlatsByManagerFilters from './filters'
import dayjs from 'dayjs'
import DataStats from './data-stats'
import { usePDF } from 'react-to-pdf'

const FlatsByManagersReport = () => {
	const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
	const { flats_per_manager } = useAppSelector((state) => state.reports)
	const userList = flats_per_manager?.users || []

	const downloadPDF = () => {
		toPDF()
	}

	return (
		<div className="flex flex-col gap-4  lg:flex-row">
			<div className="flex  w-full h-min lg:max-w-[230px]">
				<FlatsByManagerFilters downloadPDF={downloadPDF} />
			</div>

			<div className="flex flex-col w-full" ref={targetRef}>
				<Grid item xs={12} mb={2}>
					<Card>
						<div className="px-6 py-4 flex justify-between">
							<h1 className="font-medium text-xl m-0">Reporte de planas por encargado</h1>
							<p className="my-auto">{dayjs().format('ddd D [de] MMMM [del] YYYY')}</p>
						</div>
					</Card>
				</Grid>

				<Grid item xs={12} mb={2}>
					<FlatsByManagerDataGrid data={userList} />
				</Grid>

				<Grid item xs={12}>
					<DataStats data={userList} />
				</Grid>
			</div>
		</div>
	)
}

export default FlatsByManagersReport
