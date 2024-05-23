import { Navigate, Route, Routes } from 'react-router-dom'
// import AdminAuth from './AdminAuth'
import { APP_ROUTES } from './routes'
import LoginPage from '@/ui/auth/login'
import MainLayout from '@/ui/app/layout'
import DashboardPage from '@/ui/app/dashboard'
import AddNewEnlonado from '@/ui/app/enlonados/add-new'
import UsersPage from '@/ui/app/users'
import AddNewUser from '@/ui/app/users/add-new-user'
import EnlonadosPage from '@/ui/app/enlonados'
import EnlonadosDetailPage from '@/ui/app/enlonados/enlonado-detail'
import WorkShiftsPage from '@/ui/app/work-shifts'
import AddWorkShiftPage from '@/ui/app/work-shifts/add-work-shift'
import ReportsPage from '@/ui/app/reports'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={APP_ROUTES.AUTH.SIGN_IN.path} element={<LoginPage />} />
			<Route path={APP_ROUTES.APP.HOME.path} element={<MainLayout />}>
				<Route path={APP_ROUTES.APP.DASHBOARD.path} element={<DashboardPage />} />

				{/* Enlonados */}
				<Route path={APP_ROUTES.APP.NEW_ENLONADO.path} element={<AddNewEnlonado />} />
				<Route path={APP_ROUTES.APP.ENLONADOS.path} element={<EnlonadosPage />} />
				<Route path={APP_ROUTES.APP.ENLONADOS.DETAIL.path} element={<EnlonadosDetailPage />} />

				{/* Users */}
				<Route path={APP_ROUTES.APP.USERS.path} element={<UsersPage />} />
				<Route path={APP_ROUTES.APP.USERS.ADD.path} element={<AddNewUser />} />

				{/* Work shifts */}
				<Route path={APP_ROUTES.APP.WORK_SHIFTS.path} element={<WorkShiftsPage />} />
				<Route path={APP_ROUTES.APP.WORK_SHIFTS.ADD.path} element={<AddWorkShiftPage />} />

				{/* Reports */}
				<Route path={APP_ROUTES.APP.REPORTS.path} element={<ReportsPage />} />

				<Route path="*" element={<Navigate to={APP_ROUTES.APP.DASHBOARD.path} replace />} />
			</Route>
			<Route path="*" element={<Navigate to={APP_ROUTES.AUTH.SIGN_IN.path} replace />} />
		</Routes>
	)
}

export default AppRouter
