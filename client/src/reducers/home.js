import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [], 
    market: [],
    profiles: [],
    donations: [],
    career: [],
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
            state.profiles = payload.profiles
            state.donations = payload.donations
            state.career = payload.career
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