export const AUTO_FULLSCREEN = "AUTO_FULLSCREEN"
export const HEADER_BACK_PRESSED = "HEADER_BACK_PRESSED "
export const TO_BE_SAVED = "TO_BE_SAVED"

export const autoFullscreen = (bool) => {
    return {
        type: AUTO_FULLSCREEN,
        payload: bool
    }
}
export const headerBackPressed = (bool) => {
    return {
        type: HEADER_BACK_PRESSED,
        payload: bool
    }
}
export const toBeSaved = (anime) => {
    return {
        type: TO_BE_SAVED,
        payload: anime
    }
}