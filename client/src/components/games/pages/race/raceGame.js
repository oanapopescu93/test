import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function race_game(props){
    console.log(props)
    let self = this	

    this.ready = function(){
        console.log('ready')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function RaceGame(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}

    useEffect(() => {
        let my_race = new race_game(options)
        return () => {
            if(my_race){
                my_race.leave()
                my_race = null
            }
        }
    }, [])

    return <div className="game_container race_game_container">
        <canvas id="race_canvas" className="shadow_convex"></canvas>
    </div>
}

export default RaceGame