import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    history: [],
    login: [], 
    products: []
}

const pageSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        bringAuth: () => {
            console.log("bringAuth!!!")
        },
        showAuth: (state, { payload }) => {
            console.log('showAuth ', payload)
        },
        resetAuth: () => initialState,
    }
})

export const {
    bringAuth,
    showAuth,
    resetAuth
} = pageSlice.actions

export default pageSlice.reducer