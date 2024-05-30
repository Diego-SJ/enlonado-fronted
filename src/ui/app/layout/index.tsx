import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Outlet, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import { APP_ROUTES } from '@/routes/routes'
import useMediaQuery from '@/hooks/useMediaQueries'
import { Diversity1Outlined } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { User } from '@/redux/reducers/users/types'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean
}>(({ theme, open }) => ({
	flexGrow: 1,
	backgroundColor: '#eef2f6',
	height: '100vh',
	overflowY: 'auto',
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}))

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		backgroundColor: '#ffffff',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}))

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}))

export default function MainLayout() {
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const { is_admin } = useAppSelector((state) => state.users?.user_auth?.user as User)
	const [open, setOpen] = React.useState(false)
	const { isDesktop, isPhablet } = useMediaQuery()
	const navigate = useNavigate()

	React.useEffect(() => {
		if (isDesktop) {
			setOpen(true)
		}
	}, [isDesktop])

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const changeRoute = (route: string) => {
		navigate(route)
		if (isPhablet) {
			handleDrawerClose()
		}
	}

	const signOut = async () => {
		await dispatch(userActions.signOut())
		navigate(APP_ROUTES.AUTH.SIGN_IN.path)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} elevation={0}>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" color={'gray'}>
						MCaxuxi
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					backgroundColor: '#ffffff',
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="persistent"
				anchor="left"
				elevation={0}
				open={open}
			>
				<DrawerHeader>
					<div className="flex items-center justify-start gap-4 w-full">
						<Avatar sx={{ width: 40, height: 40 }}>MC</Avatar>
						<Typography variant="h6" noWrap component="div">
							MCaxuxi
						</Typography>
					</div>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.DASHBOARD.path)}>
							<ListItemIcon>{<GridViewOutlinedIcon />}</ListItemIcon>
							<ListItemText primary="Incio" />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.ENLONADOS.path)}>
							<ListItemIcon>{<LocalShippingOutlinedIcon />}</ListItemIcon>
							<ListItemText primary="Enlonados" />
						</ListItemButton>
					</ListItem>

					{is_admin && (
						<>
							<ListItem disablePadding>
								<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.USERS.path)}>
									<ListItemIcon>{<PeopleAltOutlinedIcon />}</ListItemIcon>
									<ListItemText primary="Colaboradores" />
								</ListItemButton>
							</ListItem>

							<ListItem disablePadding>
								<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.COMPANIES.path)}>
									<ListItemIcon>{<BusinessOutlinedIcon />}</ListItemIcon>
									<ListItemText primary="Empresas" />
								</ListItemButton>
							</ListItem>

							<ListItem disablePadding>
								<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.WORK_SHIFTS.path)}>
									<ListItemIcon>{<Diversity1Outlined />}</ListItemIcon>
									<ListItemText primary="Equipos" />
								</ListItemButton>
							</ListItem>

							<ListItem disablePadding>
								<ListItemButton onClick={() => changeRoute(APP_ROUTES.APP.REPORTS.path)}>
									<ListItemIcon>{<PieChartOutlineOutlinedIcon />}</ListItemIcon>
									<ListItemText primary="Reportes" />
								</ListItemButton>
							</ListItem>
						</>
					)}
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={signOut}>
							<ListItemIcon>{<ExitToAppOutlinedIcon />}</ListItemIcon>
							<ListItemText primary="Cerrar sesión" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	)
}
