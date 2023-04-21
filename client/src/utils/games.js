import roulette_bets_european from '../img/roulette/roulette_bets_european.png'
import roulette_bets_american from '../img/roulette/roulette_bets_american.png'
import roulette_bets_european_small from '../img/roulette/roulette_bets_european_small.png'
import roulette_bets_american_small from '../img/roulette/roulette_bets_american_small.png'

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

export const get_roulette_bets = function(){
	return [
	  	{id: 'european', src: roulette_bets_european},
	  	{id: 'european_small', src: roulette_bets_european_small},
	  	{id: 'american', src: roulette_bets_american},
	  	{id: 'american_small', src: roulette_bets_american_small},
	]
}