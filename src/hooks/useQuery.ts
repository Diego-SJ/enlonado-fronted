import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'

function useQueryParams() {
	const location = useLocation()
	const navigate = useNavigate()
	const [queryParams, setQueryParams] = useState<URLSearchParams>()

	// Inicializar queryParams al montar el componente y reaccionar a cambios en location.search
	useEffect(() => {
		const params = new URLSearchParams(location.search)
		setQueryParams(params)
	}, [location.search])

	// Función para obtener el valor de un parámetro específico
	const getQueryParam = useCallback(
		(param: string): string | null => {
			return queryParams?.get(param) || null
		},
		[queryParams]
	)

	// Función para eliminar un parámetro específico
	const removeQueryParam = useCallback(
		(param: string) => {
			if (!queryParams) return

			queryParams.delete(param)
			// Actualizar la URL sin recargar la página
			navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
		},
		[navigate, queryParams, location.pathname]
	)

	return { get: getQueryParam, remove: removeQueryParam }
}

export default useQueryParams
