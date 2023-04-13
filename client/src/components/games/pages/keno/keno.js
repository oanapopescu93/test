import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function keno_game(props){
    console.log(props)
    let self = this	

    this.ready = function(){
        console.log('ready')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function Keno(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}

    useEffect(() => {
        let my_keno = new keno_game(options)
        return () => {
            if(my_keno){
                my_keno.leave()
                my_keno = null
            }
        }
    }, [])

    return <div className="game_container keno_container">
        <canvas id="keno_canvas" className="shadow_convex"></canvas>
    </div>
}

export default Keno