import { Card, Grid, TextField } from '@mui/material'
import UsersDataGrid from './users-data-grid'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/routes/routes'
import Breadcrumb from '../layout/breadcrumb'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { userActions } from '@/redux/reducers/users'
import { User } from '@/redux/reducers/users/types'

import functions from '@/utils/functions'
import { useDebounce } from '@uidotdev/usehooks'

const UsersPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { data } = useAppSelector(({ users }) => users)
	const [users, setUsers] = useState<User[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const firstRender = useRef(false)
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			dispatch(userActions.fetchUsers())
		}
	}, [dispatch, firstRender])

	useEffect(() => {
		if (data?.length > 0 && !!debouncedSearchTerm) {
			const filteredUsers = data?.filter(
				(user) =>
					functions.includes(user.name + ' ' + user.surnames, debouncedSearchTerm) ||
					functions.includes(user.username, debouncedSearchTerm) ||
					functions.includes(user.phone, debouncedSearchTerm) ||
					functions.includes(user.role, debouncedSearchTerm)
			)
			setUsers(filteredUsers)
		} else {
			setUsers(data || [])
		}
	}, [data, debouncedSearchTerm])

	const handleAddUser = () => {
		navigate(APP_ROUTES.APP.USERS.ADD.path)
	}

	return (
		<Grid container spacing={2}>
			<Breadcrumb
				title="Usuarios"
				current="Usuarios"
				links={[{ name: 'Inicio', path: APP_ROUTES.APP.DASHBOARD.path }]}
				onAdd={handleAddUser}
			>
				<Grid item xs={12} md={4}>
					<TextField
						label="Buscar por nombre, apellido..."
						fullWidth
						size="small"
						onChange={(event) => {
							const value = event.target.value
							setSearchTerm(value)
						}}
					/>
				</Grid>
			</Breadcrumb>

			<Grid item xs={12} sx={{ margin: '0 auto' }}>
				<Card elevation={0}>
					<UsersDataGrid data={users} />
				</Card>
			</Grid>
		</Grid>
	)
}

export default UsersPage
