import { useDispatch } from 'react-redux'
import { AUTO_FULLSCREEN, HEADER_BACK_PRESSED, TO_BE_SAVED } from './action'

const initialState = {
    autoFullscreen: false,
    headerBackPressed: false,
    toBeSaved: null
}

const settingsReducer = async ( state = initialState, action ) => {
    const dispatch = useDispatch()
    switch(action.type) {
        case AUTO_FULLSCREEN:
            return {
                ...state,
                autoFullscreen: action.payload
            }
        case HEADER_BACK_PRESSED:
            return {
                ...state,
                headerBackPressed: action.payload,
            }
        case TO_BE_SAVED:
            return {
                
            }
        default:
            return state
    }
}

export default settingsReducer