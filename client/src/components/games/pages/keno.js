import React from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'

function Keno(props){
    const {lang} = props
    let dispatch = useDispatch()

    return <div className="game_container">
        <p>Keno</p>
    </div>
}

export default Keno