import { SAVE_HISTORY, DELETE_HISTORY } from './action'

const historyReducer = (state = [] ,action) => {
    let newState = [...state]
    switch(action.type){
        case SAVE_HISTORY:
            const { title, image, id, episode, totalepisode, time, duration } = action.payload

            // delete history when time == duration
            if( ~~time == ~~duration) {
                newState = newState.filter( i => i.title != title)
                return newState
            }
            
            // update time if still the same episode
            // let checkDup = state.filter(i => i.title == title)
            // if( checkDup.length != 0 ) {

            // }
      
            // check if a title already exist
            newState = newState.filter( i => i.title != title)

            newState.length == 5 && newState.pop()
            newState.unshift({ 
                title: title,
                image: image,
                id: id,
                episode: episode,
                totalepisode: totalepisode,
                time: time,
                duration: duration
            })
            console.log(action.payload)
            return newState

        case DELETE_HISTORY:
            newState = newState.filter( i => i.title != action.payload )
            return newState

        default: return state
    }
}

export default historyReducer