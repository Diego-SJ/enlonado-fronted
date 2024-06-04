export type UsersSlice = {
	user_auth: UserAuth
	isLogged: boolean
	data: User[]
	teams: Team[]
	loading: boolean
}

export type UserAuth = {
	session?: {
		access_token: string
		expires_at: number
		expires_in: number
		refresh_token: string
		token_type: string
	} | null
	user?: User | null
}

export enum UserRoles {
	ADMIN = 'ADMIN',
	EMPLOYEE = 'EMPLOYEE',
	SUPPORT = 'SUPPORT'
}

export const ROLE_NAME = {
	[UserRoles.ADMIN]: 'Administrador',
	[UserRoles.EMPLOYEE]: 'Colaborador',
	[UserRoles.SUPPORT]: 'Ayudante'
}

export type User = {
	user_id: string
	created_at: Date | string
	name: string
	surnames?: string
	phone?: string
	emergency_contacts?: EmergencyContacts | null
	role?: UserRoles
	username: string
	password: string
	is_admin?: boolean
}

export type EmergencyContacts = {
	[key: string]: {
		name: string
		phone: string
	}
}

// Teams types

export type Team = {
	team_id: string
	created_at: Date | string
	name: string
	manager_id: string
	team_members: TeamMembers
	is_active: boolean
	users?: User
}

export type TeamMembers = {
	list?: Partial<User & { fullname?: string }>[]
}
