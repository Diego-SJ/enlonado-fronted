import {
	Enlonado,
	FLAT_TYPE,
	FLAT_TYPE_TEXT,
	PAYMENT_METHOD_TEXT
} from '@/redux/reducers/enlonados/types'

export const enlonados = {
	downloadCsv: (enlonados: Enlonado[]) => {
		const csv = enlonados.map((enlonado) => {
			return {
				Folio: enlonado.folio,
				Fecha: enlonado.date,
				['Hora inicio']: enlonado.start_time,
				['Hora fin']: enlonado.end_time,
				['Tiempo por plana']: `${enlonado.time_per_flat || 0} min`,
				Tipo: FLAT_TYPE_TEXT[enlonado.flat_type as keyof typeof FLAT_TYPE],
				['Plana 1']: enlonado.flat_1,
				['Plana 2']: enlonado.flat_2 || 'N/A',
				Encargado: enlonado?.users?.name,
				Placa: enlonado.plate,
				['Nombre del chofer']: enlonado.driver_name,
				['Método de pago']:
					PAYMENT_METHOD_TEXT[enlonado.payment_method as keyof typeof PAYMENT_METHOD_TEXT],
				Equipo: enlonado.teams?.name,
				Empresa: enlonado.companies?.name,
				Comentarios: enlonado.comments
			}
		})

		const keys = Object.keys(csv[0])
		const csvContent =
			'data:text/csv;charset=utf-8,' +
			keys.join(',') +
			'\n' +
			csv.map((row) => keys.map((key) => row[key as keyof typeof row]).join(',')).join('\n')

		const encodedUri = encodeURI(csvContent)
		const link = document.createElement('a')
		link.id = 'download-csv'
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', 'enlonados.csv')
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}
}
