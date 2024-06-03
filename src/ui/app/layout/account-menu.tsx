import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { Divider } from '@mui/material'
import { userActions } from '@/redux/reducers/users'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'

export default function AccountMenu() {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const user = useAppSelector((state) => state?.users?.user_auth?.user)
	const dispatch = useAppDispatch()
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const goToProfile = () => {
		handleClose()
		navigate(APP_ROUTES.APP.PROFILE.hash`${user?.user_id!}`)
	}

	const signOut = async () => {
		handleClose()
		await dispatch(userActions.signOut())
	}

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="large"
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>
							{user?.name?.charAt(0).toUpperCase() || 'U'}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={goToProfile}>
					<ListItemIcon>
						<Face6OutlinedIcon />
					</ListItemIcon>
					Perfil
				</MenuItem>
				<Divider />
				<MenuItem onClick={signOut}>
					<ListItemIcon>
						<LogoutOutlined />
					</ListItemIcon>
					Cerrar sesión
				</MenuItem>
			</Menu>
		</React.Fragment>
	)
}