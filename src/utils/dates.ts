import dayjs, { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/es' // Importar la localización en español
import advancedFormat from 'dayjs/plugin/advancedFormat' // Esto no es estrictamente necesario pero es útil para formateo avanzado
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

dayjs.extend(advancedFormat) // Extender dayjs con el plugin avanzado
dayjs.locale('es') // Usar localización en español
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

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
	},
	getWeeks(
		year: number | string,
		monthNumber?: number | string
	): { weeksInYear: number; weeksInMonth?: number } {
		// Convertir year a número si es una cadena
		const yearNum = Number(year)
		const month = Number(monthNumber)

		// Validar que el año sea un número válido
		if (isNaN(yearNum) || yearNum < 1) {
			return { weeksInYear: 0, weeksInMonth: 0 }
		}

		// Validar que el mes sea un número válido entre 1 y 12 si está definido
		if (!!month && month !== undefined && (isNaN(month) || month < 1 || month > 12)) {
			return { weeksInYear: 0, weeksInMonth: 0 }
		}

		// Función auxiliar para obtener el número de semanas en un mes específico
		const getWeeksInMonth = (year: number, month: number): number => {
			const firstDayOfMonth = new Date(year, month - 1, 1)
			const lastDayOfMonth = new Date(year, month, 0)
			const firstWeekDay = firstDayOfMonth.getDay()
			const totalDays = lastDayOfMonth.getDate()
			return Math.ceil((firstWeekDay + totalDays) / 7)
		}

		// Obtener el número de semanas en el año
		const getWeeksInYear = (year: number): number => {
			const firstDayOfYear = new Date(year, 0, 1)
			const lastDayOfYear = new Date(year, 11, 31)
			const firstWeekDay = firstDayOfYear.getDay()
			const totalDays =
				(lastDayOfYear.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24) + 1
			return Math.ceil((firstWeekDay + totalDays) / 7)
		}

		const weeksInYear = getWeeksInYear(yearNum)

		// Si se proporciona el mes, calcular el número de semanas en el mes
		if (month !== undefined) {
			const weeksInMonth = getWeeksInMonth(yearNum, month)
			return { weeksInYear, weeksInMonth }
		}

		// Si no se proporciona el mes, retornar solo el número de semanas en el año
		return { weeksInYear, weeksInMonth: 0 }
	},
	generateArrayFromNumber: (number: number): number[] => {
		return Array.from({ length: number }, (_, index) => index) || []
	},
	getWeekNumber: (date: Dayjs): number => {
		const firstDayOfTheYear = dayjs(date).startOf('year')
		const startOfYear = dayjs(firstDayOfTheYear)
		const dayOfYear = date.diff(startOfYear, 'day') + 1
		return Math.ceil(dayOfYear / 7)
	},
	getWeeksIds: (start?: Dayjs | null, end?: Dayjs | null): number[] => {
		const startDate = dayjs(start)
		const endDate = dayjs(end)
		if (!startDate?.isValid() || !endDate?.isValid()) {
			return []
		}

		if (startDate?.isAfter(endDate)) {
			return []
		}

		const weeks = new Set<number>()
		let currentDate = startDate.startOf('isoWeek')

		while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'isoWeek')) {
			weeks.add(currentDate.isoWeek())
			currentDate = currentDate.add(1, 'week')
		}

		return Array.from(weeks).sort((a, b) => a - b)
	},
	formatMinutes: (minutes?: number): string => {
		if (!minutes) return '- - -'

		if (minutes < 0) {
			return 'El número de minutos debe ser positivo.'
		}

		const duration = dayjs.duration(minutes, 'minutes')
		const hours = duration.hours()
		const mins = duration.minutes()

		if (hours > 0) {
			return `${hours} h ${mins} min`
		} else {
			return `${mins} min`
		}
	}
}
