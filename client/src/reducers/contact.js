import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    send: null, 
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        bringPayload: () => {
            //console.log("bringContact!!!")
        },
        showPayload: (state, { payload }) => {
            state.send = payload.send
        },
        resetContact: () => initialState,
    }
})

export const {
    bringPayload,
    showPayload,
    resetContact
} = contactSlice.actions

export default contactSlice.reducer