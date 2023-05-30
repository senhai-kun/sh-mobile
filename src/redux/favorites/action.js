export const SAVE_FAVORITES = 'SAVE_FAVORITES'
export const DELETE_FAVORITES = 'DELETE_FAVORITES'

export const saveFavorites = (history) => {
    return {
        type: SAVE_FAVORITES,
        payload: history
    }
}

export const deleteFavorites = (anime) => {
    return {
        type: DELETE_FAVORITES,
        payload: anime
    }
}