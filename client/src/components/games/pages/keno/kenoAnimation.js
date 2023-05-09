import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import $ from 'jquery'
import { draw_dot } from '../../../../utils/games'

function keno_game(props){
    console.log(props)
    let self = this	
    let canvas
    let ctx
    let canvas_width = 700
	let canvas_height = 700
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
				canvas.width = 300
				canvas.height = 300
                radiusBig = 300
			} else {
				//small portrait
				canvas.width = 300
				canvas.height = 300
                radiusBig = 300
			}
		} else {
			//big
			canvas.width = 700
			canvas.height = 700
            radiusBig = 300
		}
        canvas_width = canvas.width
		canvas_height = canvas.height	
		canvas.height = canvas_height
	}

    this.createBallArray = function(){
        for (let i=0; i<howManyBalls; i++){
            ballsArray[i] = {
                radius: 25,
                xspeed: 0,
                yspeed: 0,
                xpos: canvas.width/2,
                ypos: canvas.height/2,
                changeDir: false,
            }
            let speed = 1
            if(Math.round(Math.random())>0.5){
                speed = -1
            }
            ballsArray[i].xspeed = speed * Math.floor((Math.random()*2000)+1000)            
            speed = 1
            if(Math.round(Math.random())>0.5){
                speed = -1
            }
            ballsArray[i].yspeed = speed * Math.floor((Math.random()*2000)+1000)
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

    this.lineDistance = function(positionx, positiony){
		let xs = 0
		let ys = 0
		xs = positionx - canvas.width/2
		xs = xs * xs
		ys = positiony - canvas.width/2
		ys = ys * ys
		return Math.sqrt( xs + ys )
	}	

    this.move = function(){
        setTimeout(function(){
            self.spin(2200)
       }, 1000)  
    }

    this.spin = function(time){ 
		let spin_nr = 0
		let spin_time = time
        let tprev = 0 // this is used to calculate the time step between two successive calls of run
        let t = 0

		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame		||
			window.mozRequestAnimationFrame			||
			function( callback ){
			  window.setTimeout(callback, 1000 / 60)
			}
	    })()
	  
	    function run(t) {
			if(ctx){
				let stop = false
				if (spin_nr > spin_time) {
					stop = true
				} else {
					spin_nr++					
					stop = false
                    
                    if (t === undefined){
                        t=0
                    }
                    let h = t - tprev   // time step 
                    tprev = t                    

                    for(let i in ballsArray){
                        ballsArray[i].xpos += ballsArray[i].xspeed * 0.5/1000  // update position according to constant speed
                        ballsArray[i].ypos += ballsArray[i].yspeed * 1/1000  // update position according to constant speed
                    }

                    // change speed direction
                    for(let i in ballsArray){
                        if (self.lineDistance(ballsArray[i].xpos, ballsArray[i].ypos) + ballsArray[i].radius > radiusBig) { 
                            ballsArray[i].changeDir = true
                            
                            let nx_o = canvas.width/2 -  ballsArray[i].xpos
                            let ny_o = canvas.width/2 -  ballsArray[i].ypos
                    
                            let nx = nx_o / (Math.sqrt(nx_o * nx_o + ny_o * ny_o))
                            let ny = ny_o / (Math.sqrt(nx_o * nx_o + ny_o * ny_o))
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

	  	run(11)  
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