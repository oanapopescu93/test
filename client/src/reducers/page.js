import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 'default',
    game: null,
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage: (state, { payload }) => {
            state.page = payload
        },
        changeGame: (state, { payload }) => {
            state.game = payload
        },
        resetPage: () => initialState,
    }
})

export const {
    changePage,
} = pageSlice.actions

export default pageSlice.reducer