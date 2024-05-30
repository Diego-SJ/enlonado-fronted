import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/es' // Importar la localización en español
import advancedFormat from 'dayjs/plugin/advancedFormat' // Esto no es estrictamente necesario pero es útil para formateo avanzado

dayjs.extend(advancedFormat) // Extender dayjs con el plugin avanzado
dayjs.locale('es') // Usar localización en español

export const dates = {
	fullDate: (dateString?: string | Dayjs) => {
		if (!dateString) return '- - -'
		const date = dayjs(dateString)

		// Formatear según "{día de la semana} {día del mes} de {mes} del {año}"
		// Ejemplo: "martes 23 de marzo del 2021"
		return date.format('ddd D [de] MMMM [del] YYYY')
	},
	timeString: (timeString?: string | Dayjs) => {
		if (!timeString) return '- - -'
		const time = dayjs(timeString, 'HH:mm:ss')

		// Convertir a formato de 12 horas con AM/PM
		// Ejemplo: "5:45 pm"
		return time.format('h:mm A')
	}
}
