import { PERMISSIONS_NAMES } from '@/constants/permissions'

import { FC } from 'react'

export type AppModules = keyof typeof PERMISSIONS_NAMES

type ModuleAccessProps = {
	moduleName: AppModules
	children: React.ReactNode
}

export const ModuleAccess: FC<ModuleAccessProps> = () => {
	// const { user_auth } = useAppSelector(({ users }) => users);

	// if (company?.membership_id && plans[company.membership_id].includes(moduleName as AppModules)) {
	//   return <>{children}</>;
	// }
	return null
}
