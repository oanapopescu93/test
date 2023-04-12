import React from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'

function Craps(props){
    const {lang} = props
    let dispatch = useDispatch()

    return <div className="game_container">
        <p>Craps</p>
    </div>
}

export default Craps