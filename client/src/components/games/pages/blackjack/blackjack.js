import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import GameBoard from '../other/gameBoard'

function Card(config){
	let self = this
	
	self.draw_box = function(ctx){
		
	}	

	self.show_cards = function(ctx, hand){
		
	}

	self.show_cards_value = function(ctx, hand){
		
	}

	self.draw_card_number = function(ctx, text, x, y, w, h){	
		
	}

	this.draw_card = function(ctx, x, y, w, h, size, hand){
		
	}
}

function blackjack_game(props){
    console.log(props)
    let self = this	

    this.ready = function(){
        console.log('ready')
    }

    this.leave = function(){
        console.log('leave')
    }
}

function Blackjack(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}

    useEffect(() => {
        let my_blackjack = new blackjack_game(options)
        return () => {
            if(my_blackjack){
                my_blackjack.leave()
                my_blackjack = null
            }
        }
    }, [])

    return <div className="game_container blackjack_container">
        <canvas id="blackjack_canvas"></canvas>
        <GameBoard lang={props.lang}></GameBoard>
    </div>
}

export default Blackjack