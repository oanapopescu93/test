import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function GameBoard(props){
    const {lang} = [props]
    let dispatch = useDispatch()    

    return <div className="gameboard_container">
        <p>GameBoard</p>
    </div>
}

export default GameBoard