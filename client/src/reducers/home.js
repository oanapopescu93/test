import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [], 
    market: [],
    currencies: [],
    profiles: [],
    donations: [],
    career: [],
    questions: [],
    slot_prises: [],
    race_rabbits: [],
    contact: [],
    loaded: false
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        bringPayload: () => {
            //console.log("bringThemAll!!!")
        },
        showPayload: (state, { payload }) => {
            state.products = payload.products
            state.market = payload.market
            state.currencies = payload.currencies
            state.profiles = payload.profiles
            state.donations = payload.donations
            state.career = payload.career
            state.questions = payload.questions
            state.slot_prises = payload.slot_prises
            state.race_rabbits = payload.race_rabbits
            state.contact = payload.contact
            state.loaded = true
        },
        resetHome: () => initialState,
    }
})

export const {
    bringPayload,
    showPayload,
    resetHome
} = homeSlice.actions

export default homeSlice.reducer