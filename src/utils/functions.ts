const functions = {
	includes: function (value1 = '', value2 = '') {
		// Normalizar los textos para eliminar acentos
		const normalizedValue1 = this.normalizeText(value1)?.toLowerCase()
		const normalizedValue2 = this.normalizeText(value2)?.toLowerCase()

		// Construir un patrón de expresión regular para buscar value2 en cualquier lugar de value1
		return !!normalizedValue1?.includes(normalizedValue2)
	},
	normalizeText: (text: string) => {
		let newText = text?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '')
		return newText?.replace(/[^\w\s]/gi, '') || ''
	},
	getTagColor: (frase: string) => {
		const hash = frase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
		const colores = [
			'green',
			'volcano',
			'gold',
			'magenta',
			'red',
			'orange',
			'lime',
			'cyan',
			'blue',
			'geekblue',
			'purple'
		]
		return colores[hash % colores.length]
	},
	getDate: (): Date | string => {
		const date = new Date()
		return date.toISOString().substring(0, 10)
	},
	calculateMinutesBetweenTimes: (time1?: string | null, time2?: string | null): number => {
		// Validar si cualquiera de los tiempos es null, undefined o vacío
		if (!time1 || !time2) {
			console.error('Alguno de los tiempos es null, undefined o vacío.')
			return 0
		}

		// Validar el formato 'hh:mm'
		const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
		if (!timeRegex.test(time1) || !timeRegex.test(time2)) {
			return 0
		}

		// Descomponer las horas y minutos de cada tiempo
		const [hours1, minutes1] = time1.split(':').map(Number)
		const [hours2, minutes2] = time2.split(':').map(Number)

		// Convertir las horas y minutos a minutos totales desde la medianoche
		const totalMinutes1 = hours1 * 60 + minutes1
		const totalMinutes2 = hours2 * 60 + minutes2

		// Calcular la diferencia en minutos
		const minutesDifference = Math.abs(totalMinutes2 - totalMinutes1)

		return minutesDifference
	},
	isValidSecondTime(time1?: string | null, time2?: string | null): boolean {
		// Validar si cualquiera de los tiempos es null, undefined o vacío
		if (!time1 || !time2) {
			console.error('Alguno de los tiempos es null, undefined o vacío.')
			return false
		}

		// Validar el formato 'hh:mm'
		const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
		if (!timeRegex.test(time1) || !timeRegex.test(time2)) {
			console.error('Formato de tiempo incorrecto. Asegúrate de usar el formato hh:mm.')
			return false
		}

		// Descomponer las horas y minutos de cada tiempo
		const [hours1, minutes1] = time1.split(':').map(Number)
		const [hours2, minutes2] = time2.split(':').map(Number)

		// Convertir las horas y minutos a minutos totales desde la medianoche
		const totalMinutes1 = hours1 * 60 + minutes1
		const totalMinutes2 = hours2 * 60 + minutes2

		// Evaluar si la segunda hora es mayor que la primera
		return totalMinutes2 > totalMinutes1
	}
}

export default functions
