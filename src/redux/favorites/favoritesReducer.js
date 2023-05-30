import { SAVE_FAVORITES, DELETE_FAVORITES } from './action'

const favoritesReducer = (state = [] ,action) => {
    let newState = [...state]
    switch(action.type){
        case SAVE_FAVORITES:
            const { title, image, id, totalepisode, released, genres, status, othername  } = action.payload
      
            // check if a title already exist
            newState = newState.filter( i => i.title != title)

            newState.length == 20 && newState.pop()
            newState.unshift({ 
                title: title,
                image: image,
                id: id,
                totalepisode: totalepisode,
                released: released,
                genres: genres,
                status: status,
                othername: othername
            })
            console.log(action.payload)
            return newState

        case DELETE_FAVORITES:
            newState = newState.filter( i => i.title != action.payload )
            return newState

        default: return state
    }
}

export default favoritesReducer