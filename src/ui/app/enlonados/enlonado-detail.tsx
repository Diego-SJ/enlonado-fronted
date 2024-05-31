import { Box, Card, Grid, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { useEffect, useRef, useState } from 'react'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useStore'
import { enlonadosActions } from '@/redux/reducers/enlonados'

import EnlonadoInfoPanel from './detail-info'
import EnlonadoEditPanel from './detail-edit'

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

const EnlonadosDetailPage = () => {
	const { enlonado_id } = useParams()
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current && !!enlonado_id) {
			firstRender.current = true
			dispatch(enlonadosActions.fetchEnlonadoById(enlonado_id))
		}
	}, [enlonado_id, dispatch])

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
									icon={<InfoOutlinedIcon />}
									iconPosition="start"
									{...a11yProps(0)}
									sx={{ minHeight: 'unset', paddingTop: '12px' }}
								/>
								<Tab
									label="Editar"
									icon={<NoteAltOutlinedIcon />}
									iconPosition="start"
									{...a11yProps(1)}
									sx={{ minHeight: 'unset', paddingTop: '12px' }}
								/>
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<EnlonadoInfoPanel />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<EnlonadoEditPanel />
						</CustomTabPanel>
					</Box>
				</Card>
			</Grid>
		</Grid>
	)
}

export default EnlonadosDetailPage
