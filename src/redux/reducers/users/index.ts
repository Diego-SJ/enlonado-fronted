import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Team, User, UserAuth, UsersSlice } from './types'
import customActions from './actions'

const initialState: UsersSlice = {
	user_auth: { user: null, session: null } as UserAuth,
	data: [],
	teams: [],
	isLogged: false,
	loading: false
}

const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		resetSlice: () => initialState,
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setUserAuth(state, action: PayloadAction<UserAuth>) {
			state.user_auth = { ...state.user_auth, ...action.payload }
		},
		setIsLogged(state, action: PayloadAction<boolean>) {
			state.isLogged = action.payload
		},
		setUsers(state, action: PayloadAction<User[]>) {
			state.data = action.payload
		},
		setTeams(state, action: PayloadAction<Team[]>) {
			state.teams = action.payload
		},
		setUserProfile(state, action: PayloadAction<User>) {
			state.user_auth = { ...state.user_auth, user: action.payload }
		}
	}
})

export const userActions = { ...users.actions, ...customActions }

export default users.reducer
