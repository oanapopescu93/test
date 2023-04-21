import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    roulette: {
        bets: [],
        lucky_bet: {},
        result: {}
    },
    blackjack: {
        bets: [],
        result: {}
    },
    slots: {
        bets: [],
        result: {}
    },
    craps: {
        bets: [],
        result: {}
    },
    race: {
        bets: [],
        result: {}
    },
    keno: {
        bets: [],
        result: {}
    }
}

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        changeRouletteBets: (state, { payload }) => {
            state.roulette.bets = payload
        },
        changeRouletteLuckyBet: (state, { payload }) => {
            state.roulette.lucky_bet = payload
        },
        resetAuth: () => initialState,
    }
})

export const {
    changeRouletteBets,
    changeRouletteLuckyBet,
} = gamesSlice.actions

export default gamesSlice.reducer