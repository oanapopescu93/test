import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import { Button } from 'react-bootstrap'
import { changePopup } from '../../../../reducers/popup'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate, faCarrot} from '@fortawesome/free-solid-svg-icons'

function roulette_game(props){
    console.log(props)
    let self = this	
    let canvas
    let ctx    
    let lang = props.lang
	let socket = props.socket
	const dispatch = props.dispatch
	let roulette_type = props.game.table_type
	let canvas_width = 900
	let canvas_height = 800
    let bets = props.bets

    this.ready = function(){
        self.createCanvas(canvas_width, canvas_height)
		self.choose_roulette_type()
    }

    this.createCanvas = function(canvas_width, canvas_height){		
		canvas = document.getElementById("roulette_canvas")	
		ctx = canvas.getContext("2d")
		
		if (window.innerWidth < 960){
			if(window.innerHeight < window.innerWidth){
				//small landscape				
				
			} else {
				//small portrait
				
			}
		} else {
			//big
			
		}
	}
	
	this.choose_roulette_type = function(){			
		self.nr_colors()
		self.start()
		self.roulette_click()
	}
	
	this.nr_colors = function(){
		
	}

	this.start = function(){			
		ctx.clearRect(0,0, canvas_width, canvas_height)

	}

    this.drawRoulette = function(){

    }

    this.roulette_click = function(){
        if(bets && bets.length>0){

        } else {
            let payload = {
                open: true,
                template: "error",
                title: translate({lang: lang, info: "error"}),
                data: translate({lang: lang, info: "no_bets"})
            }
            dispatch(changePopup(payload))
        }
    }

    this.spin = function(){
        console.log('spin!!!')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function RouletteGame(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}
    let my_roulette = new roulette_game(options)

    useEffect(() => {
        return () => {
            if(my_roulette){
                my_roulette.leave()
                my_roulette = null
            }
        }
    }, [])

    function openTable(){
        props.openTable()
    }

    function gameStart(){
        if(my_roulette){
            my_roulette.roulette_click()
        }
    }

    return <div className="roulette_container">
        <canvas id="roulette_canvas"></canvas>
        <div className="game_start">
            <Button 
                type="button"  
                className="mybutton round button_transparent"
                onClick={()=>gameStart()}
            ><FontAwesomeIcon icon={faRotate} /></Button>
            <Button 
                type="button"  
                className="mybutton round button_transparent"
                onClick={()=>openTable()}
            ><FontAwesomeIcon icon={faCarrot} /></Button>
        </div>
    </div>
}

export default RouletteGame