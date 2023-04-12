import React from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'

function Blackjack(props){
    const {lang} = props
    let dispatch = useDispatch()

    return <div className="game_container">
        <p>Blackjack</p>
    </div>
}

export default Blackjack