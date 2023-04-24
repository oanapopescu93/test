import {combineReducers} from 'redux'

import settingsReducer from './settings'
import pageReducer from './page'
import homeReducer from './home'
import authReducer from './auth'
import popupReducer from './popup'
import gamesReducer from './games'
import cartReducer from './cart'

const allReducers = combineReducers({	
	settings: settingsReducer,
	page: pageReducer,
	home: homeReducer,
	auth: authReducer,
	popup: popupReducer,
	games: gamesReducer,
	cart: cartReducer,
})

export default allReducers