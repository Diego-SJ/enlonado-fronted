import AppRouter from '@/routes/Router'
import { ThemeProvider, createTheme } from '@mui/material'
import { blue, cyan, green, orange } from '@mui/material/colors'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useEffect, useRef } from 'react'
import { userActions } from '@/redux/reducers/users'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { esES } from '@mui/material/locale'
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme(
	{
		palette: {
			primary: {
				main: blue.A400
			},
			secondary: {
				main: '#fff'
			},
			warning: {
				main: orange[500]
			},
			success: {
				main: green[500]
			},
			info: {
				main: cyan[500]
			}
		},
		shape: {
			borderRadius: 10
		},
		components: {
			MuiToolbar: {
				styleOverrides: {
					root: {
						backgroundColor: '#ffffff'
					}
				}
			},
			MuiDrawer: {
				styleOverrides: {
					paper: {
						borderRight: '1px solid transparent'
					}
				}
			},
			MuiCard: {
				styleOverrides: {
					root: {
						boxShadow: '0 0 20px -10px rgba(33, 37, 41, 0.1)'
					}
				}
			}
		}
	},
	esES
)

function App() {
	const dispatch = useAppDispatch()
	const { isLogged } = useAppSelector(({ users }) => users)
	const mounted = useRef(false)

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true
			if (isLogged) {
				;(async () => {
					dispatch(userActions.fetchUserProfile())
				})()
			}
		}
	}, [isLogged, mounted, dispatch])
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
				<ToastContainer position="top-center" theme="dark" closeOnClick autoClose={2500} />
				<AppRouter />
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
