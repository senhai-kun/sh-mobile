import { IS_UPDATED, VIDEOFULLSCREEN, TOAST_ONCE, TAB_SELECT, ANIME_TITLE, GENRE } from "./action"

const initialState = {
    videofullscreen: false,
    toastOnce: false,
    header: 'Home',
    genre: '',
    isUpdated: true,
    animeTitle: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ANIME_TITLE:
            return{
                ...state,
                animeTitle: action.payload
            }
        case GENRE:
            return{
                ...state,
                genre: action.payload
            }
        case TAB_SELECT:
            return{
                ...state,
                header: action.payload
            }
        case IS_UPDATED: 
            return {
                ...state,
                isUpdated: action.payload
            }
        case VIDEOFULLSCREEN:
            console.log(action.payload)
            return {
                ...state,
                videofullscreen: action.payload
            }
        case TOAST_ONCE:
            return {
                ...state,
                toastOnce: action.payload
            }
        default: return state
    }
}
export default reducer