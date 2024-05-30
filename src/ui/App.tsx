import AppRouter from '@/routes/Router'
import { ThemeProvider, createTheme } from '@mui/material'
import { blue, cyan, green, orange } from '@mui/material/colors'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme({
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
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ToastContainer position="top-center" theme="colored" />
				<AppRouter />
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
