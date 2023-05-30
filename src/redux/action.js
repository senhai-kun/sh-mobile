export const IS_UPDATED = 'IS_UPDATED'
export const VIDEOFULLSCREEN = 'VIDEOFULLSCREEN'
export const TOAST_ONCE = 'TOAST_ONCE'
export const TAB_SELECT = 'TAB_SELECT'
export const GENRE = 'GENRE'

export const animeTitle = (title) => {
    return {
        type: ANIME_TITLE,
        payload: title
    }
} 

export const genreName = (genre) => {
    return {
        type: GENRE,
        payload: genre
    }
} 

export const tabSelect = (tabHeader) => {
    return {
        type: TAB_SELECT,
        payload: tabHeader
    }
} 

export const isUpdated = (bool) => {
    return {
        type: IS_UPDATED,
        payload: bool
    }
} 

export const videoFullScreen = (bool) => {
    return {
        type: VIDEOFULLSCREEN,
        payload: bool
    }
}

export const toastOnce = (bool) => {
    return {
        type: TOAST_ONCE,
        payload: bool
    }
}