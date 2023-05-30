import { AUTO_FULLSCREEN, AUTO_PLAY_ON_LOAD, SKIP_INTRO_BUTTON } from './action'

const user = {
    autoVideoFullscreen: true,
    autoPlayOnLoad: false,
    skipIntroButton: true
}

const userPreferences = (state = user, action) => {
    switch(action.type){
        case AUTO_FULLSCREEN:
            return{
                ...state,
                autoVideoFullscreen: action.payload
            }
        case AUTO_PLAY_ON_LOAD:
            return{
                ...state,
                autoPlayOnLoad: action.payload
            }
        case SKIP_INTRO_BUTTON:
            return{
                ...state,
                skipIntroButton: action.payload
            }
        default: return state
    }
}

export default userPreferences