import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import combinedReducer from './combineReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userPref','history', 'favorites']
}

const persistedReducer = persistReducer(persistConfig, combinedReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}