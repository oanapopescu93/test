import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        account_type: 1,
        device: 0,
        email: "",
        money: 0,
        user: "",
        uuid: null,
    },
}

const pageSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeUser: (state, { payload }) => {
            if(payload.account_type){
                state.user.account_type = payload.account_type
            }
            if(payload.device === 0 || payload.device === 1 || payload.device === 2){
                state.user.device = payload.device
            }
            if(payload.email){
                state.user.email = payload.email
            }
            if(payload.money){
                state.user.money = payload.money
            }
            if(payload.user){
                state.user.user = payload.user
            }
            if(payload.uuid){
                state.user.uuid = payload.uuid
            }
        },
        resetAuth: () => initialState,
    }
})

export const {
    changeUser,
} = pageSlice.actions

export default pageSlice.reducer