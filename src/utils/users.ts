import { TeamMembers, User } from '@/redux/reducers/users/types'

export const formatTeamMembers = (teamMembers: string[], users: User[]): TeamMembers => {
	let list = teamMembers.map((teamMember) => {
		let { user_id, name, surnames, ...user } = users.find(
			(user) => user.user_id === teamMember
		) as User
		return { user_id, name, surnames, fullname: `${name} ${surnames}` }
	})

	return { list: list || [] }
}

export const parseTeamMembers = (teamMembers: TeamMembers): string[] => {
	return (teamMembers?.list?.map((teamMember) => teamMember.user_id) || []) as string[]
}
