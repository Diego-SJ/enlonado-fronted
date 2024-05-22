export const APP_ROUTES = {
	AUTH: {
		SIGN_IN: { path: '/', title: 'Inicio de sesión' }
	},
	APP: {
		HOME: { path: '/app', title: 'Inicio' },
		DASHBOARD: { path: '/app/dashboard', title: 'Dashboard' },
		NEW_ENLONADO: { path: '/app/enlonados/nuevo', title: 'Nuevo enlonado' },
		USERS: {
			path: '/app/usuarios',
			title: 'Nuevo enlonado',
			ADD: { path: '/app/usuarios/nuevo', title: 'Nuevo usuario' }
		},
		ENLONADOS: {
			path: '/app/enlonados',
			title: 'Enlonados',
			ADD: { path: '/app/enlonados/nuevo', title: 'Nuevo enlonado' },
			DETAIL: {
				path: '/app/enlonados/:id',
				title: 'Detalle de enlonado',
				hash: (_: TemplateStringsArray, id: string) => `/app/enlonados/${id}`
			}
		}
	}
}
