import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../utils'

const initialState = {
    lang: getCookie("website_language") !== "" ? getCookie("website_language") : "ENG",
    cookies: getCookie("website_cookies") !== "" ? getCookie("website_cookies") : "0",
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeLanguage: (state, { payload }) => {
            state.lang = payload
            setCookie("website_language", payload)
        },
        changeCookies: (state) => {
            state.cookies = '1'
            setCookie("website_cookies", '1')
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