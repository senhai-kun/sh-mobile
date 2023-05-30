import { SEARCH_RESULT } from './action'

const initialState = {
    searchResult: []
}

const searchReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload
            }
        default:
            return state
    }
}

export default searchReducer