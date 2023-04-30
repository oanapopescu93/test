import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import { draw_dot, getRoom, get_slots_images } from '../../../../utils/games'
import $ from 'jquery'
import { sortList } from '../../../../utils/utils'
import GameBoard from '../other/gameBoard'
import { changePopup } from '../../../../reducers/popup'
import { decryptData } from '../../../../utils/crypto'

var images_pos = []
function slots_game(props, id){
    let self = this    
	let items = props.items
    let reel = null
	let canvas_height = 800
	let slots_canvas = []
	let slots_ctx = []
    let ctx

	let image_size = [100, 100]
	let image_size_canvas = [290, 290, 5, 5, 80, 80]
	let spin_time = 3000 // how long all slots spin before starting countdown
	let spin_time_reel = spin_time/5 // how long each slot spins at minimum
	let slot_speed = [] // how many pixels per second slots roll
	let speed = 10
	let slot_type = ""
	
	this.state = 0
	this.images = []
	this.images_set = []
    this.offset = []
	let suffle_array = []
	this.lastUpdate = new Date()
	let now = new Date()

    let slots_status = false

    this.ready = function(){
        self.fit()
        suffle_array = slots_data.array
        reel = self.get_reel()
        self.offset = self.get_offset(reel)	
		self.create_slot_machine_lines()			

        let promises = []
        for(let i in items){				
            promises.push(self.preaload_images(items[i]))
        }

        Promise.all(promises).then(function(result){            
            self.images = result	
            slots_canvas = []
            for(let i in reel){	
				slot_speed.push(speed)
                self.images = self.create_suffle(i, self.images)
                slots_canvas.push(reel[i][0])
                self.createCanvas(slots_canvas[slots_canvas.length-1])					
                self.draw_reel(slots_canvas[slots_canvas.length-1], self.images, false)
            }
        })
    }

    this.resize = function(){
        self.fit()
        slots_canvas = []
        reel = self.get_reel(props.lines)
        self.offset = self.get_offset(reel)
		self.create_slot_machine_lines()		
        for(let i in reel){
			slot_speed.push(speed)
            slots_canvas.push(reel[i][0])
            self.createCanvas(slots_canvas[slots_canvas.length-1])
            self.draw_reel(slots_canvas[slots_canvas.length-1], images_pos[i], true)
        }
    }

    this.get_reel = function(){
        let reel = []
		$('.slot_canvas').each(function(){
            reel.push($(this))
        })
		return reel
	}

    this.get_offset = function(reel){
        let offset = []
		for(let i in reel){
            offset.push(0)
        }
		return offset
	}

    this.fit = function(){
		speed = 10
		image_size = [100, 100]
		image_size_canvas = [290, 290, 5, 5, 80, 80]
		slot_speed = []
		if (window.innerWidth < 768){
			image_size = [50, 50]
			image_size_canvas = [290, 290, 3, 3, 40, 40]
			speed = 5
		}				
	}

	this.create_slot_machine_lines = function(){
		if(reel){
			let width = reel.length * (image_size[0] + 10) // the img plus + the border
			let height = 3 * (image_size[1] + 10) // the img plus + the border
			let canvas_lines = $('#slot_machine_lines')[0]
			canvas_lines.width = width
			canvas_lines.height = height
		}	
	}

    this.create_suffle = function(i, images){
		let images01 = []
		for(let j in suffle_array[i]){
			let t = suffle_array[i][j]
			images01.push(images[t])
		}
		return images01
	}

    this.preaload_images = function(item){
		return new Promise(function(resolve, reject){
			let image = new Image()
			image.id = item.id
			image.src = item.src
			image.setAttribute('coord_x', item.coord[0])
			image.setAttribute('coord_y', item.coord[1])
			image.addEventListener("load", function() {
				resolve(image)
			}, false)
		})
	}

    this.createCanvas = function(canvas){
		ctx = canvas.getContext("2d")
		slots_ctx.push(ctx)		
		canvas.width = image_size[0]
		canvas.height = 2 * items.length * image_size[1]
		canvas_height = canvas.height		
		canvas.height = canvas_height
    }

    this.draw_reel = function(canvas, assets, resize=false){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#ddd'
		let array = []

		if(typeof assets !== "undefined"){
			let length = assets.length
			for (let i = 0 ; i < length ; i++) {			
				let img = assets[i]
                if(resize){
                    img = assets[i].img
                }

                ctx.fillRect(0, i * canvas.width, canvas.width, 2)
				ctx.fillRect(0, (i + length)  * canvas.width, canvas.width, 2)

				let sx = img.getAttribute( "coord_x" )
				let sy = img.getAttribute( "coord_y" )
				let swidth = image_size_canvas[0]
				let sheight = image_size_canvas[1]
				let x = image_size_canvas[2]
				let y = image_size_canvas[3]+i*image_size[1]
				let width = image_size_canvas[4]
				let height = image_size_canvas[5]
				ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
				ctx.drawImage(img, sx, sy, swidth, sheight, x, (i + length) * canvas.width, width, height)

				let elem = {i:i, img:img, pos:i * canvas.width}
				array.push(elem)	
				elem = {i:i + length, img:img, pos:(i + length) * canvas.width}
				array.push(elem)	
            }

            array = sortList(array, 'i')
            if(!resize){
                images_pos.push(array)
            }	
        }
    }

    this.start = function(){
        slots_status = true
		self.spin()
	}

    this.spin = function(){
		self.reset()
		let same = false	
		let result
		let matrix_result
		let pos

		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			  window.setTimeout(callback, 1000 / 60)
			}
	  	})()

	  	function spin_slot() {
			self.update(self.state)
			if(self.running){
				window.requestAnimFrame(spin_slot)
			} else {
				window.cancelAnimationFrame(spin_slot)
				result = self.win_lose(self.get_results_pos())
				//this is just to check the winnings
				result = [
					true, 
					[
						[0, 0],
						[0, 1],
						[2, 2],
						[0, 3],
						[0, 4],
					], 
					"18",
				]
                self.drawResultsArray(result)
			}
		}
		
		spin_slot()
	}

    this.reset = function(){
		self.running = true
		self.state = 0
		self.stopped = []
		slot_speed = []
        reel = self.get_reel(props.lines)
        self.offset = self.get_offset(reel)
		for(let i in reel){
			self.stopped.push(false)
			slot_speed.push(speed)
		}
		let canvas_lines = $('#slot_machine_lines')[0]
		let ctx_lines = canvas_lines.getContext("2d")
		ctx_lines.clearRect(0, 0, canvas_lines.width, canvas_lines.height)
	}

    this.update = function(state){
		now = new Date()
		function check_slot() {
			if ( now - self.lastUpdate > spin_time_reel ) {
				return true // done
			}
			return false
		}
		switch (state) {
			case 0: // all slots spinning
				if (now - self.lastUpdate > spin_time) {
					self.state = 1
					self.lastUpdate = now					
				} 
				break
			case 6:
				self.running = false
				break
			default: //stop slots one after the other
				self.stopped[state-1] = check_slot()
				if (self.stopped[state-1]) {
					slot_speed[state-1] = 0
					self.state++
					self.lastUpdate = now
				}	
		}
		for(let i in reel){
			self.rotate(i, slot_speed[i])
		}
		for(let i in reel){
			if(slot_speed[i] === 0){
				if(self.offset[i]%100 !== 0){
					self.running = true
					self.rotate(i, 10)
				}
			}
		}
	}

    this.rotate = function(i, slot_speed){        
		self.offset[i] = self.offset[i] - slot_speed
		let max_height = -(reel[i][0].height - items.length * image_size[1])
		if(self.offset[i] < max_height){
			self.offset[i] = 0
		}
		reel[i].css('transform', 'translate(0px, '+self.offset[i]+'px)')
	}

    this.get_results_pos = function(){
		let results = []
		let result_offset = self.offset
		for(let t=0; t<3; t++){
			let result = []
			for(let i in result_offset){
				for(let j in images_pos[i]){
					if(images_pos[i][j].pos === -result_offset[i]){
						result.push(images_pos[i][j])	
					}
				}
			}
			results.push(result)
		}
		return results
	}

    this.win_lose = function(results){
		let same = true
		let win_results = []
		let t = -1
        let win = slots_data.matrix
		for(let i in win){	
			if(win[i].matrix.length !== 0){
				let my_matrix = win[i].matrix
				same = true
				for(let j=0; j<my_matrix.length-1; j++){
					let x1 = my_matrix[j][0]
					let y1 = my_matrix[j][1]
					let x2 = my_matrix[j+1][0]
					let y2 = my_matrix[j+1][1]
					//if one of the spots that is compared is a carrots
					let my_veggy = results[x1][y1].img.id === "carrot" || results[x2][y2].img.id === "carrot" || results[x1][y1].img.id === "potato" || results[x2][y2].img.id === "potato"					
					if(results[x1][y1].img.id === results[x2][y2].img.id || my_veggy){
						win_results = my_matrix
						t = i
					} else {
						same = false
						win_results = []
						break
					}
				}
			}
		}
		
		return [same, win_results, results, t]
	}

    this.drawResultsArray = function(result){		
		if(result[0]){				
			let canvas = $('#slot_machine_lines')[0]
			if(canvas){
				ctx = canvas.getContext("2d")
				ctx.beginPath()				
				ctx.moveTo(image_size[0]/2, image_size[1]/2)
				ctx.strokeStyle = "red"
				ctx.lineWidth = 5

				for(let i=1; i<result[1].length; i++){				
					ctx.lineTo(result[1][i][1] * image_size[1] + image_size[1]/2, result[1][i][0] * image_size[1] + image_size[1]/2)
				}
				ctx.stroke()
				ctx.closePath()
			}

			for(let i=0; i<result[1].length; i++){	
                draw_dot(ctx, result[1][i][1] * image_size[1] + image_size[1]/2, result[1][i][0] * image_size[1] + image_size[1]/2, 8, 0, 2 * Math.PI, false, 'red', 1, 'red')
			}

			self.pay(slots_bets, true)
			
		} else {
			self.pay(slots_bets, false)
		}
    }

    this.pay = function(pay, win){
		let game = null
		if(props.page && props.page.game){
			game = props.page.game
		}
		let status = win ? "win" : "lose"
		let money_original = decryptData(props.user.money)
		let money = win ? money_original + pay : money_original - pay
		let slots_payload = {
			uuid: props.user.uuid,
			game: game,
			money: money,
			status: status,
			bet: pay
		}
		if(typeof props.results === "function"){
            props.results(slots_payload)
        }
    }
}

let slots_data = null
let slots_bets = 0
function Slots(props){
    let dispatch = useDispatch()    
    let game = props.page.game
    let game_type = game.table_type
    let lines = 5
    switch(game_type) {
        case "type1":
            lines = 5
            break
        case "type2":
        default: 
            lines = 5
            break
    }
    let items = get_slots_images()
    let options = {...props, lines, items, dispatch}
    let my_slots = new slots_game(options)	

    useEffect(() => {
        let payload = {uuid: props.user.uuid, lines, room: getRoom(game), items: items}	
        props.socket.emit('slots_send', payload)	        
        $(window).resize(function(){
			if(my_slots){
                my_slots.resize()
            }
		})
		return () => {
			if(my_slots){
				my_slots.leave()// if the user leaves the game, if he bet, he will lose the bets
				my_slots = null
				slots_data = null
				slots_bets = 0
				slots_status = false
			}
		}
    }, [])

    useEffect(() => {
		props.socket.on('slots_read', function(data){
			if(my_slots && data){
                slots_data = data
                my_slots.ready()
            }	
		})	
    }, [props.socket])

    function choice(type){		
        if(type === "start" && my_slots){
            if(slots_bets>0){
                my_slots.start()
            } else {
                let payload = {
                    open: true,
                    template: "error",
                    title: translate({lang: props.lang, info: "error"}),
                    data: translate({lang: props.lang, info: "no_bets"})
                }
                dispatch(changePopup(payload))
            }            
        }
    }

    function updateBets(x){
        slots_bets = x
    }

    return <div className="game_container">
        <div className="slot_machine">
            <canvas id="slot_machine_lines"></canvas>
            {(() => {
                switch(lines) {
                case 3:
                    return <>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_1'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_2'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_3'></canvas></div>
                    </>
                case 5:
                default: 
                    return <>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_1'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_2'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_3'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_4'></canvas></div>
                        <div className="box"><canvas className="slot_canvas" id='slot_canvas_5'></canvas></div>
                    </>
                }
            })()}
        </div>
        <div className="slot_machine_board">
            <GameBoard template="slots" {...props} choice={(e)=>choice(e)} updateBets={(e)=>updateBets(e)}></GameBoard>
        </div>
    </div>
}

export default Slots