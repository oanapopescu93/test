import React from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'

function Roulette(props){
    const {lang} = props
    let dispatch = useDispatch()

    return <div className="game_container">
        <p>Roulette</p>
    </div>
}

export default Roulette