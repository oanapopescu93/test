import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    title: "",
    template: "",
    data: null,
    size: "sm",
}

const popupsSlice = createSlice({
    name: 'popups',
    initialState,
    reducers: {
        changePopup: (state, { payload }) => {
            if(typeof payload.open == "boolean"){
                state.open = payload.open
            }
            if(payload.title){
                state.title = payload.title
            }
            if(payload.template){
                state.template = payload.template
            }
            if(payload.data){
                state.data = payload.data
            }
            if(payload.size){
                state.size = payload.size
            }
        },
    }
})

export const {
    changePopup,
} = popupsSlice.actions

export default popupsSlice.reducer