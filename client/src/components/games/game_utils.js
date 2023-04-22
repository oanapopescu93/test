export const draw_dot = function(x, y, r,sAngle,eAngle,counterclockwise, fillStyle, lineWidth, strokeStyle){
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
	ctx.closePath()
}
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