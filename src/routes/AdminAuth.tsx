import { useAppSelector } from '@/hooks/useStore'
import { APP_ROUTES } from '@/routes/routes'

import { Navigate, useLocation } from 'react-router-dom'

const ADMIN_PATH = APP_ROUTES.AUTH.SIGN_IN.path

const AdminAuth = ({ children }: { children: JSX.Element }) => {
	const { isLogged } = useAppSelector(({ users }) => users)
	const location = useLocation()

	if (!isLogged && location?.pathname !== ADMIN_PATH) return <Navigate to={ADMIN_PATH} replace />
	else if (isLogged && location?.pathname === ADMIN_PATH)
		return <Navigate to={APP_ROUTES.APP.DASHBOARD.path} replace />
	return children
}

export default AdminAuth
