import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersReducer from './reducers/users'
import companiesReducer from './reducers/companies'
import enlonadosReducer from './reducers/enlonados'
import reportsReducer from './reducers/reports'

const rootReducer = combineReducers({
	users: usersReducer,
	companies: companiesReducer,
	enlonados: enlonadosReducer,
	reports: reportsReducer
})

const persistConfig = { key: 'enlonados.app', version: 1, storage }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type AppDispatch = typeof store.dispatch
export type AppState = () => RootState
