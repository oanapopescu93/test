import roulette_bets_european from '../img/roulette/roulette_bets_european.png'
import roulette_bets_american from '../img/roulette/roulette_bets_american.png'
import roulette_bets_european_small from '../img/roulette/roulette_bets_european_small.png'
import roulette_bets_american_small from '../img/roulette/roulette_bets_american_small.png'

import card_back from '../img/blackjack/cards/back.png'
import card_0 from '../img/blackjack/cards/card_0.png'
import card_1 from '../img/blackjack/cards/card_1.png'
import card_2 from '../img/blackjack/cards/card_2.png'
import card_3 from '../img/blackjack/cards/card_3.png'
import card_4 from '../img/blackjack/cards/card_4.png'
import card_5 from '../img/blackjack/cards/card_5.png'
import card_6 from '../img/blackjack/cards/card_6.png'
import card_7 from '../img/blackjack/cards/card_7.png'
import card_8 from '../img/blackjack/cards/card_8.png'
import card_9 from '../img/blackjack/cards/card_9.png'
import card_10 from '../img/blackjack/cards/card_10.png'
import card_11 from '../img/blackjack/cards/card_11.png'
import card_12 from '../img/blackjack/cards/card_12.png'
import card_13 from '../img/blackjack/cards/card_13.png'
import card_14 from '../img/blackjack/cards/card_14.png'
import card_15 from '../img/blackjack/cards/card_15.png'
import card_16 from '../img/blackjack/cards/card_16.png'
import card_17 from '../img/blackjack/cards/card_17.png'
import card_18 from '../img/blackjack/cards/card_18.png'
import card_19 from '../img/blackjack/cards/card_19.png'
import card_20 from '../img/blackjack/cards/card_20.png'
import card_21 from '../img/blackjack/cards/card_21.png'
import card_22 from '../img/blackjack/cards/card_22.png'
import card_23 from '../img/blackjack/cards/card_23.png'
import card_24 from '../img/blackjack/cards/card_24.png'
import card_25 from '../img/blackjack/cards/card_25.png'
import card_26 from '../img/blackjack/cards/card_26.png'
import card_27 from '../img/blackjack/cards/card_27.png'
import card_28 from '../img/blackjack/cards/card_28.png'
import card_29 from '../img/blackjack/cards/card_29.png'
import card_30 from '../img/blackjack/cards/card_30.png'
import card_31 from '../img/blackjack/cards/card_31.png'
import card_32 from '../img/blackjack/cards/card_32.png'
import card_33 from '../img/blackjack/cards/card_33.png'
import card_34 from '../img/blackjack/cards/card_34.png'
import card_35 from '../img/blackjack/cards/card_35.png'
import card_36 from '../img/blackjack/cards/card_36.png'
import card_37 from '../img/blackjack/cards/card_37.png'
import card_38 from '../img/blackjack/cards/card_38.png'
import card_39 from '../img/blackjack/cards/card_39.png'
import card_40 from '../img/blackjack/cards/card_0.png'
import card_41 from '../img/blackjack/cards/card_41.png'
import card_42 from '../img/blackjack/cards/card_42.png'
import card_43 from '../img/blackjack/cards/card_43.png'
import card_44 from '../img/blackjack/cards/card_44.png'
import card_45 from '../img/blackjack/cards/card_45.png'
import card_46 from '../img/blackjack/cards/card_46.png'
import card_47 from '../img/blackjack/cards/card_47.png'
import card_48 from '../img/blackjack/cards/card_48.png'
import card_49 from '../img/blackjack/cards/card_49.png'
import card_50 from '../img/blackjack/cards/card_50.png'
import card_51 from '../img/blackjack/cards/card_51.png'

export const getMousePos = function(canvas, event) {
	let rect = canvas.getBoundingClientRect()
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	}
}	
export const isInside = function(mousePos, obj){
	return mousePos.x > obj.x && mousePos.x < obj.x + obj.width && mousePos.y < obj.y + obj.height && mousePos.y > obj.y
}
export const draw_dot = function(ctx, x, y, r,sAngle,eAngle,counterclockwise, fillStyle, lineWidth, strokeStyle){
    ctx.beginPath()
    ctx.arc(x, y, r, sAngle, eAngle, counterclockwise)
    ctx.fillStyle = fillStyle
    if(strokeStyle !== ""){
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeStyle
        ctx.stroke()
    }		
    ctx.fill()
    ctx.closePath()
}
export const draw_rect = function(ctx, x, y, width, height, fillStyle, lineWidth, strokeStyle){
	ctx.beginPath()
	ctx.rect(x, y, width, height)
	ctx.fillStyle = fillStyle
	if(strokeStyle !== ""){
		ctx.lineWidth = lineWidth
		ctx.strokeStyle = strokeStyle
		ctx.stroke()
	}		
	ctx.fill()
}
export const getDistance_between_entities = function(entity01, entity02){
    let distance_x = entity01.x - entity02.x
    let distance_y = entity01.y - entity02.y
    return Math.sqrt(distance_x * distance_x + distance_y * distance_y)
}

export const getRoom = function(game){
	let room = game.table_name
	if(game.table_id){
		room = room + '_' + game.table_id
	}
	if(game.table_type){
		room = room + '_' + game.table_type
	}
	return room
}

export const get_roulette_bets = function(){
	return [
	  	{id: 'european', src: roulette_bets_european},
	  	{id: 'european_small', src: roulette_bets_european_small},
	  	{id: 'american', src: roulette_bets_american},
	  	{id: 'american_small', src: roulette_bets_american_small},
	]
}

export const get_blackjack_cards = function() {
	return [
	  {suit: '', value: '', src: card_back}, 
	  {suit: 'Hearts', value: 'A', src: card_0}, 
	  {suit: 'Hearts', value: '2', src: card_1}, 
	  {suit: 'Hearts', value: '3', src: card_2}, 
	  {suit: 'Hearts', value: '4', src: card_3}, 
	  {suit: 'Hearts', value: '5', src: card_4}, 
	  {suit: 'Hearts', value: '6', src: card_5}, 
	  {suit: 'Hearts', value: '7', src: card_6}, 
	  {suit: 'Hearts', value: '8', src: card_7}, 
	  {suit: 'Hearts', value: '9', src: card_8}, 
	  {suit: 'Hearts', value: '10', src: card_9}, 
	  {suit: 'Hearts', value: 'J', src: card_10}, 
	  {suit: 'Hearts', value: 'Q', src: card_11}, 
	  {suit: 'Hearts', value: 'K', src: card_12}, 
	  {suit: 'Spades', value: 'A', src: card_13}, 
	  {suit: 'Spades', value: '2', src: card_14}, 
	  {suit: 'Spades', value: '3', src: card_15}, 
	  {suit: 'Spades', value: '4', src: card_16}, 
	  {suit: 'Spades', value: '5', src: card_17}, 
	  {suit: 'Spades', value: '6', src: card_18}, 
	  {suit: 'Spades', value: '7', src: card_19}, 
	  {suit: 'Spades', value: '8', src: card_20}, 
	  {suit: 'Spades', value: '9', src: card_21}, 
	  {suit: 'Spades', value: '10', src: card_22}, 
	  {suit: 'Spades', value: 'J', src: card_23}, 
	  {suit: 'Spades', value: 'Q', src: card_24}, 
	  {suit: 'Spades', value: 'K', src: card_25}, 
	  {suit: 'Diamonds', value: 'A', src: card_26}, 
	  {suit: 'Diamonds', value: '2', src: card_27}, 
	  {suit: 'Diamonds', value: '3', src: card_28}, 
	  {suit: 'Diamonds', value: '4', src: card_29}, 
	  {suit: 'Diamonds', value: '5', src: card_30}, 
	  {suit: 'Diamonds', value: '6', src: card_31}, 
	  {suit: 'Diamonds', value: '7', src: card_32}, 
	  {suit: 'Diamonds', value: '8', src: card_33}, 
	  {suit: 'Diamonds', value: '9', src: card_34}, 
	  {suit: 'Diamonds', value: '10', src: card_35}, 
	  {suit: 'Diamonds', value: 'J', src: card_36}, 
	  {suit: 'Diamonds', value: 'Q', src: card_37}, 
	  {suit: 'Diamonds', value: 'K', src: card_38}, 
	  {suit: 'Clubs', value: 'A', src: card_39}, 
	  {suit: 'Clubs', value: '2', src: card_40}, 
	  {suit: 'Clubs', value: '3', src: card_41}, 
	  {suit: 'Clubs', value: '4', src: card_42}, 
	  {suit: 'Clubs', value: '5', src: card_43}, 
	  {suit: 'Clubs', value: '6', src: card_44}, 
	  {suit: 'Clubs', value: '7', src: card_45}, 
	  {suit: 'Clubs', value: '8', src: card_46}, 
	  {suit: 'Clubs', value: '9', src: card_47}, 
	  {suit: 'Clubs', value: '10', src: card_48}, 
	  {suit: 'Clubs', value: 'J', src: card_49}, 
	  {suit: 'Clubs', value: 'Q', src: card_50}, 
	  {suit: 'Clubs', value: 'K', src: card_51}, 
	]
  }