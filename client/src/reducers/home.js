import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [], 
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