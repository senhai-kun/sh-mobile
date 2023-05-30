export const SAVE_HISTORY = 'SAVE_HISTORY'
export const DELETE_HISTORY = 'DELETE_HISTORY'

export const saveHistory = (history) => {
    return {
        type: SAVE_HISTORY,
        payload: history
    }
}

export const deleteHistory = (anime) => {
    return {
        type: DELETE_HISTORY,
        payload: anime
    }
}