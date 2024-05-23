import AppRouter from '@/routes/Router'
import { ThemeProvider, createTheme } from '@mui/material'
import { blue, green } from '@mui/material/colors'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme({
	palette: {
		primary: {
			main: blue.A400
		},
		secondary: {
			main: green[500]
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
				<AppRouter />
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
