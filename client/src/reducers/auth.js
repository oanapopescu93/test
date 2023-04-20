import { createSlice } from '@reduxjs/toolkit'
import { encryptData } from '../utils/crypto'
import { getCookie, setCookie } from '../utils/utils'

const initialState = {
    user: {
        account_type: getCookie("casino_account_type") !== "" ? getCookie("casino_account_type") : null,
        device: getCookie("casino_device") !== "" ? getCookie("casino_device") : null,
        email: getCookie("casino_email") !== "" ? getCookie("casino_email") : null,
        money: getCookie("casino_money") !== "" ? getCookie("casino_money") : null,
        user: getCookie("casino_user") !== "" ? getCookie("casino_user") : null,
        uuid: getCookie("casino_uuid") !== "" ? getCookie("casino_uuid") : null,
    },
    isMinor: getCookie("casino_isminor") !== "" ? getCookie("casino_isminor") : null,
}

const pageSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeUser: (state, { payload }) => {
            if(payload.account_type){
                state.user.account_type = encryptData(payload.account_type)
                setCookie("casino_account_type", encryptData(payload.account_type))
            }
            if(payload.device === 0 || payload.device === 1 || payload.device === 2){
                state.user.device = encryptData(payload.device)
                setCookie("casino_device", encryptData(payload.device))
            }
            if(payload.email){
                state.user.email = encryptData(payload.email)
                setCookie("casino_email", encryptData(payload.email))
            }
            if(payload.money){
                state.user.money = encryptData(payload.money)
                setCookie("casino_money", encryptData(payload.money))
            }
            if(payload.user){
                state.user.user = encryptData(payload.user)
                setCookie("casino_user", encryptData(payload.user))
            }
            if(payload.uuid){
                state.user.uuid = payload.uuid
                setCookie("casino_uuid", payload.uuid)
            }
        },
        changeIsMinor: (state, { payload }) => {
            state.isMinor = payload
            setCookie("casino_isminor", payload)
        },
        resetAuth: () => initialState,
    }
})

export const {
    changeUser,
    changeIsMinor
} = pageSlice.actions

export default pageSlice.reducer