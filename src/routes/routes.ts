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
			ADD: { path: '/app/usuarios/nuevo', title: 'Nuevo usuario' },
			EDIT: {
				path: '/app/usuarios/editar/:user_id',
				title: 'Editar usuario',
				hash: (_: TemplateStringsArray, user_id: string) => `/app/usuarios/editar/${user_id}`
			}
		},
		ENLONADOS: {
			path: '/app/enlonados',
			title: 'Enlonados',
			ADD: { path: '/app/enlonados/nuevo', title: 'Nuevo enlonado' },
			DETAIL: {
				path: '/app/enlonados/:enlonado_id',
				title: 'Detalle de enlonado',
				hash: (_: TemplateStringsArray, id: string) => `/app/enlonados/${id}`
			},
			DELETE: {
				path: '/app/enlonados/:enlonado_id/eliminar',
				title: 'Eliminar enlonado',
				hash: (_: TemplateStringsArray, id: string) => `/app/enlonados/${id}/eliminar`
			}
		},
		WORK_SHIFTS: {
			path: '/app/equipos',
			title: 'Equipos',
			ADD: { path: '/app/equipos/nuevo', title: 'Nuevo turno' },
			EDIT: {
				path: '/app/equipos/editar/:team_id',
				title: 'Editar equipo',
				hash: (_: TemplateStringsArray, team_id: string) => `/app/equipos/editar/${team_id}`
			}
		},
		COMPANIES: {
			path: '/app/empresas',
			title: 'Nuevo enlonado',
			ADD: { path: '/app/empresas/nuevo', title: 'Nuevo usuario' },
			DETAIL: {
				path: '/app/empresas/:company_id',
				hash: (_: TemplateStringsArray, company_id: string) => `/app/empresas/${company_id}`
			},
			EDIT: {
				path: '/app/empresas/editar/:company_id',
				title: 'Editar usuario',
				hash: (_: TemplateStringsArray, company_id: string) => `/app/empresas/editar/${company_id}`
			}
		},
		REPORTS: {
			path: '/app/reportes',
			title: 'Reportes',
			ADD: { path: '/app/reportes/nuevo', title: 'Nuevo reporte' },
			FLATS_BY_MANAGER: {
				path: '/app/reportes/planas-por-encargado',
				title: 'Planas por encargado'
			}
		},
		PROFILE: {
			path: '/app/perfil/:user_id',
			title: 'Perfil',
			hash: (_: TemplateStringsArray, user_id: string) => `/app/perfil/${user_id}`,
			EDIT: { path: '/app/perfil/editar', title: 'Editar perfil' }
		}
	}
}
