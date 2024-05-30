const add = (key: string, value: string) => {
	// Crear un objeto URL basado en la URL actual
	const url = new URL(window.location.href)

	// Agregar o actualizar el parámetro
	url.searchParams.set(key, value)

	// Cambiar la URL en el navegador sin recargar la página
	window.history.pushState({}, '', url)
}

const remove = (key: string) => {
	// Crear un objeto URL basado en la URL actual
	const url = new URL(window.location.href)

	// Eliminar el parámetro
	url.searchParams.delete(key)

	// Cambiar la URL en el navegador sin recargar la página
	window.history.pushState({}, '', url)
}

const get = (key: string, search: string) => {
	// Crear un objeto URL basado en la URL actual
	const url = new URL(search)

	// Obtener el valor del parámetro
	return url.searchParams.get(key)
}

export const queryParam = {
	add,
	remove,
	get
}
