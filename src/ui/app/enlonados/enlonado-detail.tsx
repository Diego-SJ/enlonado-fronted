import useMediaQuery from '@/hooks/useMediaQueries'
import { Box, Button, Card, Chip, Divider, Grid, Tabs, TextField, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { ReactNode, useState } from 'react'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import { lightGreen, pink } from '@mui/material/colors'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<>{children}</>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

const ItemDetail = ({ title = '', value = '' }: { title?: string; value?: string | ReactNode }) => {
	return (
		<Typography variant="body2">
			<strong className="font-semibold">{title}</strong>
			<br />
			{typeof value === 'string' ? <span className="inline-flex"> {value}</span> : value}
		</Typography>
	)
}

const EnlonadosDetailPage = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState(0)

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Detalle de enlonado"
				current="Detalle"
				links={[
					{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path },
					{ name: 'Enlonados', path: APP_ROUTES.APP.ENLONADOS.path }
				]}
			/>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab
									label="Detalles"
									icon={<NoteAltOutlinedIcon />}
									iconPosition="start"
									{...a11yProps(0)}
								/>
								{/* <Tab label="Item Two" {...a11yProps(1)} />
								<Tab label="Item Three" {...a11yProps(2)} /> */}
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={4}>
									<ItemDetail title="Encargado" value="Juanito Lopez" />
								</Grid>
								<Grid item xs={6} md={4}>
									<ItemDetail title="Folio" value="ABC-1234" />
								</Grid>
								<Grid item xs={6} md={4}>
									<ItemDetail title="Status" value="Pendiente" />
								</Grid>
								<Grid item xs={12} md={12}>
									<ItemDetail title="Empresa" value="Empresa fake 001" />
								</Grid>
								<Divider />
								<Grid item xs={6} sm={3} md={3}>
									<ItemDetail title="Fecha" value="21 de mayo 2024" />
								</Grid>
								<Grid item xs={6} sm={3} md={3}>
									<ItemDetail title="Hora inicio" value="14:30" />
								</Grid>
								<Grid item xs={6} sm={3} md={3}>
									<ItemDetail title="Hora fin" value="14:50" />
								</Grid>
								<Grid item xs={6} sm={3} md={3}>
									<ItemDetail title="Tiempo transcurrido" value="20 min." />
								</Grid>

								<Grid item xs={6} sm={3}>
									<ItemDetail title="Placas" value="HAXQC" />
								</Grid>
								<Grid item xs={6} sm={3}>
									<ItemDetail
										title="Tipo de plana"
										value={
											<Chip
												size="small"
												label="Full"
												sx={{ bgcolor: pink[600], color: 'white', paddingX: 1 }}
											/>
										}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<ItemDetail title="Plana 1" value="HAXQC" />
								</Grid>
								<Grid item xs={6} sm={3}>
									<ItemDetail title="Plana 2" value="HAXQC" />
								</Grid>

								<Grid item xs={12}>
									<ItemDetail
										title="Forma de pago"
										value={
											<Chip
												size="small"
												label="Efectivo"
												sx={{ bgcolor: lightGreen[600], color: 'white', paddingX: 1 }}
											/>
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<ItemDetail
										title="Observaciones"
										value={
											'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum lectus sit amet, aliquam nunc. Nulla facilisi. Nullam nec nunc nec nunc aliquam.'
										}
									/>
								</Grid>
							</Grid>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							Item Two
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							Item Three
						</CustomTabPanel>
					</Box>
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosDetailPage
