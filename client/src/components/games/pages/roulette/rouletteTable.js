import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function roulette_bets(props){
    let self = this	

    this.ready = function(){
        console.log('ready')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function RouletteTable(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}

    useEffect(() => {
        let my_roulette_bets = new roulette_bets(options)
        return () => {
            if(my_roulette_bets){
                my_roulette_bets = null
            }
        }
    }, [])

    return <canvas id="roulette_bets_canvas"></canvas>	
}

export default RouletteTable