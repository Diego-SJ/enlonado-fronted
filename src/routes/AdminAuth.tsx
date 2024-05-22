import { useAppSelector } from '@/hooks/useStore'
import { APP_ROUTES } from '@/routes/routes'

import { Navigate, useLocation } from 'react-router-dom'

const ADMIN_PATH = APP_ROUTES.AUTH.SIGN_IN.path

const AdminAuth = ({ children }: { children: JSX.Element }) => {
	const { user_auth } = useAppSelector(({ users }) => users)
	const location = useLocation()

	if (!user_auth?.user?.id && location?.pathname !== ADMIN_PATH)
		return <Navigate to={ADMIN_PATH} replace />
	else if (!!user_auth?.user?.id && location?.pathname === ADMIN_PATH)
		return <Navigate to={APP_ROUTES.APP.HOME.path} replace />
	return children
}

export default AdminAuth
