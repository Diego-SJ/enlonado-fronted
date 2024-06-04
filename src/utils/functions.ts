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

		// Calcular la diferencia en minutos considerando el cruce de medianoche
		let minutesDifference = totalMinutes2 - totalMinutes1

		if (minutesDifference < 0) {
			minutesDifference += 1440 // 1440 minutos en un día
		}

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
	},
	generateCrdentials: function generateUsername(firstName: string, lastName?: string) {
		// Limpiar y preparar el nombre para el username
		const cleanFirstName = firstName?.trim()?.toLowerCase() || 'usuario'

		// Generar un sufijo alfanumérico de 4 dígitos
		let suffix = ''
		if (!!lastName && lastName?.trim() !== '') {
			// Si hay apellido, usa los caracteres ASCII de los primeros cuatro caracteres para crear el sufijo
			const cleanLastName = lastName.trim()
			for (let i = 0; i < Math.min(3, cleanLastName.length); i++) {
				const charCode = cleanLastName.charCodeAt(i)
				suffix += charCode.toString(36).slice(-1) // Convertir el código ASCII a base 36 y tomar el último dígito
			}
			// Rellenar si el apellido es menor de 4 caracteres
			while (suffix.length < 3) {
				suffix += Math.floor(Math.random() * 10)
			}
		} else {
			// Generar un sufijo completamente aleatorio si no hay apellido
			for (let i = 0; i < 3; i++) {
				suffix += Math.floor(Math.random() * 36).toString(36)
			}
		}

		// Combinar nombre y sufijo para formar el username
		const username = cleanFirstName + suffix
		return username
	},
	generateRandomId: (): number => {
		let length = 10
		if (length <= 0) {
			throw new Error('El largo debe ser un número positivo mayor que cero.')
		}

		// Genera un número aleatorio con el largo especificado
		const max = Math.pow(10, length) - 1
		const min = Math.pow(10, length - 1)

		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}

export default functions
