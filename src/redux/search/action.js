export const SEARCH_RESULT = "SEARCH_RESULT"

export const searchResult = (result) => {
    return {
        type: SEARCH_RESULT,
        payload: result
    }
}