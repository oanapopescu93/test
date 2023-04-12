import React from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'

function Race(props){
    const {lang} = props
    let dispatch = useDispatch()

    return <div className="game_container">
        <p>Race</p>
    </div>
}

export default Race