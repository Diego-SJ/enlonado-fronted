export const PERMISSIONS = {
	enlonados: {
		edit_folio: true
	},
	companies: {
		view_company_module: true,
		edit_company: true,
		delete_company: true
	}
}

export const DEFAULT_PERMISSIONS = {
	enlonados: {
		edit_folio: false
	},
	companies: {
		view_company_module: false,
		edit_company: false,
		delete_company: false
	}
}

export type UserPermissions = typeof PERMISSIONS

export const PERMISSIONS_NAMES: { [key: string]: string } = {
	enlonados: 'Enlonados',
	companies: 'Empresas',
	edit_folio: 'Editar folio',
	edit_company: 'Editar empresa',
	delete_company: 'Eliminar empresa',
	view_company_module: 'Ver modulo de empresas'
}
