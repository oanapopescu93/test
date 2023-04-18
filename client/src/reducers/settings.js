import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../utils/utils'

const initialState = {
    lang: getCookie("casino_language") !== "" ? getCookie("casino_language") : "ENG",
    cookies: getCookie("casino_cookies") !== "" ? getCookie("casino_cookies") : "0",
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeLanguage: (state, { payload }) => {
            state.lang = payload
            setCookie("casino_language", payload)
        },
        changeCookies: (state) => {
            state.cookies = '1'
            setCookie("casino_cookies", '1')
        },
        resetSettings: () => initialState,
    }
})

export const {
    changeLanguage,
    changeCookies,
    resetSettings
} = settingsSlice.actions

export default settingsSlice.reducer