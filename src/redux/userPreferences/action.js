export const AUTO_FULLSCREEN = 'AUTO_FULLSCREEN'
export const AUTO_PLAY_ON_LOAD = 'AUTO_PLAY_ON_LOAD'
export const SKIP_INTRO_BUTTON = 'SKIP_INTRO_BUTTON'

export const autoFullscreen = (bool) => {
    return {
        type: AUTO_FULLSCREEN,
        payload: bool
    }
}

export const autoPlayOnLoad = (bool) => {
    return {
        type: AUTO_PLAY_ON_LOAD,
        payload: bool
    }
}

export const skipIntroButton = (bool) => {
    return {
        type: SKIP_INTRO_BUTTON,
        payload: bool
    }
}

