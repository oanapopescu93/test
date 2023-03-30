import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../utils'

const initialState = {
    lang: getCookie("website_language") !== "" ? getCookie("website_language") : "ENG",
}

const settingsSlice = createSlice({
    name: 'languageCurrency',
    initialState,
    reducers: {
        changeLanguage: (state, { payload }) => {
            state.lang = payload
            setCookie("website_language", payload)
        },
    }
})

export const {
    changeLanguage,
} = settingsSlice.actions

export default settingsSlice.reducer