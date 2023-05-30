import { combineReducers } from 'redux'
import reducer from './reducer'
import searchReducer from './search/searchReducer'
import settingsReducer from './settings/settingsReducer'
import userPreferences from './userPreferences/userPreferences'
import historyReducer from './history/historyReducer'
import favoritesReducer from './favorites/favoritesReducer'

const combineReducer = combineReducers({
    settings: reducer,
    search: searchReducer,
    userSettings: settingsReducer,
    userPref: userPreferences,
    history: historyReducer,
    favorites: favoritesReducer
})

export default combineReducer