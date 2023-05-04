import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { draw_rect } from '../../../../utils/games'
import $ from 'jquery'
import rabbit_sit from '../../../../img/rabbit_move/rabbit000.png'
import rabbit_move from '../../../../img/rabbit_move/rabbit_move_colored.png'
import obstacle from '../../../../img/icons/obstacle.png'

function Land(config) {
	let self = this
    self.layer = config.layer
    self.x = config.x
    self.y = config.y
    self.width = config.width
    self.height = config.height
}

function Landscape(config){
	let self = this
	let distance = 1

	self.x = -config.speed * distance
	self.y = config.y
    self.lands = []
	self.layer = config.layer
	self.width = {
		min: config.width.min,
    	max: config.width.max
	}
	self.height = {
		min: config.height.min,
    	max: config.height.max
	}  
	self.speed = config.speed
	self.color = config.color
	self.color_stroke = config.color_stroke
	self.stroke = config.stroke
	self.populate = function (canvas){
		let totalWidth = 0
		let x = 0
		while (totalWidth <= 2*canvas.width + (10 * self.width.max)) {
			let newWidth = Math.floor(Math.random() * self.width.max) + self.width.min
			let newHeight = Math.floor(Math.random() * self.height.max) + self.height.min
			if(self.lands.length !== 0){
				x = self.lands[self.lands.length - 1].x + self.lands[self.lands.length - 1].width + self.x
			}
			self.lands.push(new Land({
				layer: self.layer,
				width: newWidth,
				height: newHeight,
				color: self.color,
				color_stroke: self.color_stroke,
				stroke: self.stroke,
				x: x,
        		y: self.y - newHeight,
			}))

			totalWidth = totalWidth + newWidth
		}
	}
	self.draw = function(canvas, ctx){
		ctx.save()
		ctx.translate(self.x, 0)
		ctx.beginPath()
		let lands = self.lands
		ctx.moveTo(self.lands[0].x, self.lands[0].y)
		
		for(let i=0; i<lands.length-1; i++){
			let point01 = (self.lands[i].x + self.lands[i + 1].x) / 2
			let point02 = (self.lands[i].y + self.lands[i + 1].y) / 2
			ctx.quadraticCurveTo(self.lands[i].x, self.lands[i].y, point01, point02)
		}
		ctx.lineTo(canvas.width - self.x, canvas.height)
    	ctx.lineTo(0 - self.x, canvas.height)

		ctx.fillStyle = self.color
		ctx.lineWidth = self.stroke
		ctx.strokeStyle = self.color_stroke
		ctx.fill()
		ctx.stroke()
		ctx.restore()
	}
	self.update = function(){
		let x = 0
		let newWidth = Math.floor(Math.random() * self.width.max) + self.width.min
		let newHeight = Math.floor(Math.random() * self.height.max) + self.height.min
		
		if(self.lands.length !== 0){
			x = self.lands[self.lands.length - 1].x + self.lands[self.lands.length - 1].width + self.x
		}
		self.lands.push(new Land({
			layer: self.layer,
			width: newWidth,
			height: newHeight,
			color: self.color,
			color_stroke: self.color_stroke,
			stroke: self.stroke,
			x: x,
			y: self.y - newHeight,
		}))
	}
}

function Rabbit(config){
	let self = this

	self.id = config.id
	self.name = config.name
	self.color = config.color

	self.speed = config.speed
	self.delay = config.delay
	self.max_speed = config.max_speed
	self.min_speed = config.min_speed

	self.img_sit = config.img_sit
	self.img_move = config.img_move
	self.img_stop = config.img_stop

	self.x = config.x
	self.y = config.y
	self.w = config.w
	self.h = config.h
	self.y_original = config.y

	self.frameWidth = 672
	self.frameHeight = 592
	self.frame = 0
	self.avg_dist = 0
	
	self.draw = function(ctx){
		ctx.drawImage(self.img_sit, 0, 0, self.frameWidth, self.frameHeight, self.x, self.y, self.w, self.h)
	}
	self.run = function(canvas, ctx, nr, finish_line_x){
		if(nr >= self.delay){
			if(typeof finish_line_x === "undefined"){
				if(self.avg_dist > canvas.width/2){
					self.x = self.x-3
				}
			}			
			if(nr % self.speed === 0){
				self.frame++
				self.x = self.x+3				
			}
			if(self.frame > 7){
				self.frame = 0
			}					
			ctx.drawImage(self.img_move, self.frame * self.frameWidth, 2 * self.frameHeight, self.frameWidth, self.frameHeight, self.x, self.y, self.w, self.h)
		} else {
			ctx.drawImage(self.img_sit, 0, 0, self.frameWidth, self.frameHeight, self.x, self.y, self.w, self.h)
		}		
	}

	self.add_text = function(ctx, text, x, y, font, color, text_align, stroke, line){
		ctx.font = font
		if(stroke && line){
			ctx.strokeStyle = stroke
    		ctx.lineWidth = line
			ctx.strokeText(text, x, y)
			ctx.fillStyle = color
			ctx.textAlign = text_align
			ctx.fillText(text, x, y)
		} else {
			ctx.fillStyle = color
			ctx.textAlign = text_align
			ctx.fillText(text, x, y)
		}
	}

	self.stop = function(ctx, nr){
		if(self.frame !== 4){	
			if(nr % self.speed === 0){
				self.frame++
				self.x = self.x+5				
			}		
			if(self.frame > 7){
				self.frame = 0
			}						
			ctx.drawImage(self.img_move, self.frame * self.frameWidth, 2 * self.frameHeight, self.frameWidth, self.frameHeight, self.x, self.y, self.w, self.h)
		} else {
			ctx.drawImage(self.img_stop, 0, 0, self.frameWidth, self.frameHeight, self.x, self.y, self.w, self.h)
		}
	}

	self.change_speed = function(){
		let random_speed = Math.floor(Math.random() * self.max_speed) + self.min_speed
		self.speed = random_speed
	}

	self.move_view = function(all){
		let sum_dist = 0
		for(let i in all){
			sum_dist = sum_dist + all[i].x
		}
		self.avg_dist = sum_dist/all.length
	}
}

function Obstacle(config){
	let self = this
	self.id = config.id+1
	self.img = config.img
	self.color = config.color
	self.border = config.border
	self.border_color = config.border_color
	self.x = config.x
	self.y = config.y + config.w
	self.w = config.w
	self.h = config.h
	self.frameWidth = 816
	self.frameHeight = 635

	self.draw = function(ctx){
		let y001 = self.y+self.h/2
		ctx.drawImage(self.img, 0, 0, self.frameWidth, self.frameHeight, self.x, y001, self.w, self.h)
		//draw_dot(self.x, y001, self.w/2, 0, 2 * Math.PI, false, self.color, self.border, self.border_color)
		// let font_obstacle = '10px sans-serif'
		// self.add_text(self.x+'/'+self.y, self.x,  y001, font_obstacle, "black", "center")
	}
	self.add_text = function(ctx, text, x, y, font, color, text_align, stroke, line){
		ctx.font = font
		if(stroke && line){
			ctx.strokeStyle = stroke
    		ctx.lineWidth = line
			ctx.strokeText(text, x, y)
			ctx.fillStyle = color
			ctx.textAlign = text_align
			ctx.fillText(text, x, y)
		} else {
			ctx.fillStyle = color
			ctx.textAlign = text_align
			ctx.fillText(text, x, y)
		}
	}
}

function Lane(config){
	let self = this
	self.id = config.id

	self.x = config.x
	self.y = config.y
	self.w = config.w
	self.h = config.h
	self.min_speed = 0

	self.rabbit = null
	self.rabbit_config = config.rabbit_config

	self.obstacles = []
	self.obstacle_img = config.obstacle_img	
	self.obstacle_size = config.obstacle_size	
	
	self.create_rabbit = function(){
		self.rabbit = new Rabbit(self.rabbit_config)
	}

	self.create_obstacles = function(canvas){		
		let chance = Math.random() < 0.01 //probability of 1%		
		if(chance){
			let x = canvas.width + self.obstacle_size[0]
			let t = self.obstacles.length+1
			if(self.obstacles.length>0){
				if(x > self.obstacles[self.obstacles.length-1].x + 10*self.obstacle_size[0]){					
					let obstacle = new Obstacle({
						id: self.id,
						name: "obstacle_" + self.id + '_' + t,
						img: self.obstacle_img,
						color: 'rgba(255, 215, 0, 0.1)',
						border: 'rgba(255, 215, 0, 0.5)',
						border_color: 1,
						x: x,
						y: self.y,
						w: self.obstacle_size[0],
						h: self.obstacle_size[1],
					})
					self.obstacles.push(obstacle)
				}
			} else {
				let obstacle = new Obstacle({
					id: self.id,
					name: "obstacle_" + self.id + '_' + t,
					img: self.obstacle_img,
					color: 'rgba(255, 215, 0, 0.1)',
					border: 'rgba(255, 215, 0, 0.5)',
					border_color: 1,
					x: x,
					y: self.y,
					w: self.obstacle_size[0],
					h: self.obstacle_size[1],
				})
				self.obstacles.push(obstacle)
			}
		}
	}

	self.lane_update = function(obstacle){
		obstacle.x = obstacle.x-3
	}

	self.draw_obstacle = function(ctx, obstacle){
		obstacle.draw(ctx)
	}

	self.move_obstacles = function(ctx, nr){
		for(let i in self.obstacles){
			self.lane_update(self.obstacles[i], nr)
			self.draw_obstacle(ctx, self.obstacles[i])
			if(self.obstacles[i].x < -50){
				self.obstacles.splice(i, 1) 
				i--
			}
		}
	}

	self.collision = function(){
		let collision = false	
		for(let i in self.obstacles){
			if(self.collision_entities(self.rabbit, self.obstacles[i])){
				collision = true
				break
			}
		}
		return collision
	}
	self.collision_entities = function(rect01, rect02){	
		let cond01 = rect01.x <= rect02.x + rect02.w
		let cond02 = rect01.y <= rect02.y + rect02.h
		let cond03 = rect02.x <= rect01.x + rect01.w
		let cond04 = rect02.y <= rect01.y + rect01.h		
		return cond01 && cond02 && cond03 && cond04
	}

	self.action = function(ctx, rabbit_list, nr, finish_line_x){	
		//check collision
		self.rabbit.y = self.rabbit.y_original		
		if(self.collision()){					
			self.rabbit.y_original = self.rabbit.y
			self.rabbit.y = self.rabbit.y - 2*self.obstacle_size[0]
		}

		//create and move obstacle
		self.create_obstacles(nr, finish_line_x)
		self.move_obstacles(ctx, nr)

		//make rabbit run
		self.rabbit.change_speed()
		self.rabbit.move_view(rabbit_list, nr)
		self.rabbit.run(ctx, nr, finish_line_x)

		self.get_min_speed(rabbit_list, nr)
	}

	self.get_min_speed = function(all){
		let min_speed = all[0].speed
		for(let i in all){
			if(min_speed > all[i].speed){
				min_speed = all[i].speed
			}
		}
		self.min_speed = min_speed
	}
}

function FinishLine(config){
	let self = this
	let space = 2

	self.fillStyle = config.fillStyle
	self.lineWidth = config.lineWidth
	self.strokeStyle = config.strokeStyle
	self.x = config.x
	self.y = config.y
	self.cube = config.cube	

	self.draw = function(canvas, ctx){
		draw_rect(ctx, self.x, self.y, self.cube/2, canvas.height, self.fillStyle, self.lineWidth, self.strokeStyle) //line01
		
		//cubes
		let t = self.y-self.cube
		let z = 0
		while(t<canvas.height){
			t = t+self.cube
			z++
			if(z%2===0){
				draw_rect(ctx, self.x+1*self.cube+space, t, self.cube, self.cube, self.fillStyle, self.lineWidth, self.strokeStyle)
			} else {
				draw_rect(ctx, self.x+2*self.cube, t, self.cube, self.cube, self.fillStyle, self.lineWidth, self.strokeStyle)
			}
		}
		
		draw_rect(ctx, self.x + 4*self.cube-space, self.y, self.cube/2, canvas.height, self.fillStyle, self.lineWidth, self.strokeStyle) //line03
	}
	self.move = function(x){
		self.x = x
	}
}

function race_game(props){
	let self = this
	let socket = props.socket
	let lang = props.lang
	let dispatch = props.dispatch
	let dispatch_nr = 0
	let rabbit_array = props.rabbitArray	
	let lane_list = []
	let rabbit_list = []
    
    let canvas
    let ctx
	let canvas_width = 900
	let canvas_height = 800
	
	let font_title = 'bold 30px sans-serif'
	let font_counter = 'bold 40px sans-serif'

	let landscape = []
	let lanscape_config = {}
	let land_color = [
		['rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0.5)', 1], 
		['rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0.5)', 1], 
		['rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0.5)', 1]
	]	
	let draw_road_height

	let rabbit_img_sit = {src: rabbit_sit}
	let rabbit_img_move = {src: rabbit_move}
	let rabbit_img_stop = {src: rabbit_sit}
	let obstacle_img = {src: obstacle}
	let rabbit_size
	let obstacle_size

	let finish_line
	let finish_line_x = 0
		
	this.ready = function(reason){
		self.createCanvas(canvas_width, canvas_height)	
		self.start(reason)
	}

	this.createCanvas = function(canvas_width, canvas_height){	
		canvas = document.getElementById("race_canvas")	
		ctx = canvas.getContext("2d")
		
		if (window.innerWidth < 960){
			if(window.innerHeight < window.innerWidth){
				//small landscape				
				canvas.width = 300
				canvas.height = 300			
			} else {
				//small portrait
				canvas.width = 280
				canvas.height = 300		
			}
			lanscape_config = {
				y: 100,
				width: [1, 5, 1, 7],
				height: [20, 4, 30, 4],
				sun: [35, 35, 15],
			}
			draw_road_height = 101
			rabbit_size = [5, 100, 35, 35, -5]
			obstacle_size = [10, 10]
			font_title = 'bold 20px sans-serif'
			font_counter = 'bold 30px sans-serif'
		} else {
			//big
			canvas.width = 900
			canvas.height = 800
			font_title = 'bold 30px sans-serif'
			font_counter = 'bold 40px sans-serif'
			if (window.innerWidth >= 1200){
				canvas.width = 1000	
			} 
			if (window.innerWidth >= 1400){
				canvas.width = 1200
			} 
			lanscape_config = {
				y: 500,
				width: [1, 50, 1, 70],
				height: [200, 40, 300, 40],
				sun: [50, 50, 30],
			}
			draw_road_height = canvas.height/2
			rabbit_size = [10, 350, 80, 80, -10]
			obstacle_size = [20, 20]		
		}
		
		canvas_width = canvas.width
		canvas_height = canvas.height		
		canvas.height = canvas_height
		finish_line_x = canvas_width
	}

	this.start = function(reason){
		let promises = []
		if(reason !== "resize"){
				
		} else {
			
		}
	}
}

let race_bets = null
function RaceGame(props){
    let dispatch = useDispatch()	
    let options = {...props, dispatch}
    let my_race = new race_game(options)
	race_bets = props.bets

	function ready(){
		if(my_race && document.getElementById("race_canvas")){
            my_race.ready()
        }
	}

    useEffect(() => {
        ready()
        $(window).resize(function(){
			ready()
		})
		return () => {
			if(my_race){
				my_race.leave()// if the user leaves the game, if he bet, he will lose the bets
				my_race = null
			}
		}
    }, [])

	useEffect(() => {
		props.socket.on('race_read', function(data){
						
		})	
    }, [props.socket])

    return <div className="game_container race_game_container">
        <canvas id="race_canvas" className="shadow_convex"></canvas>
    </div>
}

export default RaceGame