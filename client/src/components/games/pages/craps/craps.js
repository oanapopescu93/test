import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function craps_game(props){
    console.log(props)
    let self = this	

    this.ready = function(){
        console.log('ready')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function Craps(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}

    useEffect(() => {
        let my_craps = new craps_game(options)
        return () => {
            if(my_craps){
                my_craps.leave()
                my_craps = null
            }
        }
    }, [])

    return <div className="game_container craps_container">
        <p>Craps</p>
    </div>
}

export default Craps