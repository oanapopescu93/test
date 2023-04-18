import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 'Salon',
    game: null,
    game_page: null,
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
        changeGamePage: (state, { payload }) => {
            state.game_page = payload
        },
        resetPage: () => initialState,
    }
})

export const {
    changePage,
    changeGame,
    changeGamePage,
} = pageSlice.actions

export default pageSlice.reducer