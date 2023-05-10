import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import $ from 'jquery'
import { draw_dot, getDistance_between_entities } from '../../../../utils/games'

function keno_game(props){
    let self = this	
    let canvas
    let ctx
    let canvas_width = 700
	let canvas_height = 700
    let radiusBall = 20
    let radiusBig = 300
    let ballsArray = new Array()
    let howManyBalls = 80
    let font_obstacle = '12px sans-serif'

    this.ready = function(){
        self.createCanvas(canvas_width, canvas_height)
        self.createBallArray()
        self.drawBigCircle()
        self.move()             
    }

    this.createCanvas = function(canvas_width, canvas_height){	
		canvas = document.getElementById("keno_canvas")	
		ctx = canvas.getContext("2d")
		
		if (window.innerWidth < 960){
			if(window.innerHeight < window.innerWidth){
				//small landscape
				canvas.width = 250
				canvas.height = 250
                radiusBall = 10
                radiusBig = 100
			} else {
				//small portrait
				canvas.width = 250
				canvas.height = 250
                radiusBall = 10
                radiusBig = 100
			}
		} else {
            //big
            canvas.width = 610
            canvas.height = 610
            radiusBall = 20
            radiusBig = 300
			
		}
        canvas_width = canvas.width
		canvas_height = canvas.height	
		canvas.height = canvas_height
	}

    this.createBallArray = function(){
        for (let i=0; i<howManyBalls; i++){
            ballsArray[i] = {
                radius: radiusBall,
                xspeed: 0,
                yspeed: 0,
                xpos: canvas.width/2,
                ypos: canvas.height/2,
                changeDir: false,
                dir: (Math.random() * 2) + 0.5,
            }
            let dir = (Math.random() * 1) + 0
            if(Math.round(Math.random())>0.5){
                dir = -dir
            }
            ballsArray[i].xspeed = dir * Math.floor((Math.random()*3000)+1000)            
            dir = (Math.random() * 1) + 0
            if(Math.round(Math.random())>0.5){
                dir = -dir
            }
            ballsArray[i].yspeed = dir * Math.floor((Math.random()*3000)+1000)
            ballsArray[i].number = parseInt(i)+1
       }
    }

    this.drawBallArray = function(){
        for (let i in ballsArray){
            self.drawBalls(ballsArray[i].xpos, ballsArray[i].ypos, ballsArray[i].radius, ballsArray[i].number);
        }
    }

    this.drawBalls = function(x,y,r, number){
        draw_dot(ctx, x,y,r, 0, 2 * Math.PI, false, 'rgba(255, 255, 0, 0.1)', 1, "gold")
		self.add_text(number, x, y+4, font_obstacle, "gold", "center")
    }

    self.add_text = function(text, x, y, font, color, text_align){
		ctx.font = font
		ctx.textAlign = text_align		
		ctx.fillStyle = color			
		ctx.fillText(text, x, y)
	}

    this.drawBigCircle = function() {
        ctx.clearRect(0,0,canvas.height, canvas.width)
        draw_dot(ctx, canvas.width/2, canvas.height/2, radiusBig, 0, 2 * Math.PI, false, 'rgba(255, 255, 0, 0.1)', 1, "gold")	
	}    	

    this.move = function(){
        setTimeout(function(){
            self.animation(1000)
       }, 1000)  
    }

    this.animation = function(time){ 
		let spin_nr = 0
		let spin_time = time

		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame		||
			window.mozRequestAnimationFrame			||
			function( callback ){
			  window.setTimeout(callback, 1000 / 60)
			}
	    })()

        
	  
	    function run() {
			if(ctx){
				let stop = false
				if (spin_nr > spin_time) {
					stop = true
                    self.drawBigCircle()
                    self.win_lose()
				} else {
					spin_nr++					
					stop = false            

                    for(let i in ballsArray){
                        ballsArray[i].xpos += ballsArray[i].xspeed * ballsArray[i].dir/1000  // update position according to constant speed
                        ballsArray[i].ypos += ballsArray[i].yspeed * ballsArray[i].dir/1000  // update position according to constant speed
                    }

                    // change speed direction
                    for(let i in ballsArray){
                        let point01 = {x: ballsArray[i].xpos, y: ballsArray[i].ypos}
                        let point02 = {x: canvas.width/2, y: canvas.height/2}
                        if (getDistance_between_entities(point01, point02) + ballsArray[i].radius >= radiusBig) { 
                            //ballsArray[i].changeDir = true
                            
                            let nx_o = canvas.width/2 -  ballsArray[i].xpos
                            let ny_o = canvas.width/2 -  ballsArray[i].ypos
                    
                            let nx = nx_o / (Math.sqrt(nx_o * nx_o + ny_o * ny_o))
                            let ny = ny_o / (Math.sqrt(nx_o * nx_o + ny_o * ny_o))
                            // r = v − [2 (n · v) n]
                            let v_newx = ballsArray[i].xspeed - (2 *( nx * ballsArray[i].xspeed + ny * ballsArray[i].yspeed ) ) * nx
                            let v_newy = ballsArray[i].yspeed - (2 *( nx * ballsArray[i].xspeed + ny * ballsArray[i].yspeed ) ) * ny
            
                            ballsArray[i].xspeed = v_newx
                            ballsArray[i].yspeed = v_newy
                        }
                    }

                    // redraw with new positions
                    self.drawBigCircle()
                    self.drawBallArray()
				}		
            
				if(!stop){
					window.requestAnimFrame(run)
				} else {
					window.cancelAnimationFrame(run)
				}
			} else {
                window.cancelAnimationFrame(run)
            }
	  	}

	  	run()  
	}

    this.win_lose = function(){
        console.log(props)
    }

    this.leave = function(){
        console.log('leave')
    }
}

function KenoAnimation(props){
    let dispatch = useDispatch()
    let options = {...props, dispatch}
    let my_keno = new keno_game(options)

    function ready(){
		if(my_keno && document.getElementById("keno_canvas")){
            my_keno.ready()
        }
	}

    useEffect(() => {
        ready()
        $(window).resize(function(){
			ready()
		})
		return () => {
			if(my_keno){
				my_keno.leave()// if the user leaves the game, if he bet, he will lose the bets
				my_keno = null
			}
		}
    }, [])

    return <canvas id="keno_canvas"></canvas>
}

export default KenoAnimation