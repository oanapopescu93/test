import React, {useState, useEffect} from 'react'
import under_construction_icon from '../../../../img/icons/under_construction_icon.png'
import GameBoard from '../other/gameBoard'
import { useDispatch } from 'react-redux'
import { decryptData } from '../../../../utils/crypto'
import $ from "jquery"
import { getRoom, get_cards } from '../../../../utils/games'
import { translate } from '../../../../translations/translate'
import { changePopup } from '../../../../reducers/popup'

function Card(config){
	let self = this
	self.id = config.id
	self.name = config.name
	self.user = config.user
	self.dealer = config.dealer
	
	self.x = config.x
	self.y = config.y
	self.width = config.width
	self.height = config.height
	self.card = config.card //The size of the clipped image
	self.card_img = config.card_img //The size of the image to use
	self.images = config.images

	self.show_cards = function(ctx, data){
		let player = data.players[self.id]
        if(player){
            self.draw_card(ctx, self.x, self.y, self.card.width, self.card.height, self.card_img, player.hand)
        }		
	}

	this.draw_card = function(ctx, x, y, w, h, size, hand){
		let img = self.images
		let img_index = 0
		if(hand === "hidden"){
			ctx.drawImage(img[img_index].src, 0, 0, size.width, size.height, x, y, w, h)
		} else {
			for(let i in hand){		
				switch (hand[i].Suit) { 					
					case "Hearts":
						img_index = 1		
						break				
					case "Spades":
						img_index = 14		
						break
					case "Diamonds":
						img_index = 27	
						break
					case "Clubs":
						img_index = 40							
						break
				}		  
				switch (hand[i].Value) {
					case "A":
						img_index = img_index + 0			
						break
					case "2":
						img_index = img_index + 1					
						break
					case "3":
						img_index = img_index + 2							
						break
					case "4":	
						img_index = img_index + 3				
						break
					case "5":
						img_index = img_index + 4					
						break
					case "6":
						img_index = img_index + 5						
						break
					case "7":
						img_index = img_index + 6				
						break
					case "8":
						img_index = img_index + 7							
						break
					case "9":
						img_index = img_index + 8			
						break
					case "10":
						img_index = img_index + 9					
						break
					case "J":
						img_index = img_index + 10				
						break
					case "Q":	
						img_index = img_index + 11	
						break
					case "K":
						img_index = img_index + 12					
						break			
				}				
				
				ctx.drawImage(img[img_index].src, 0, 0, size.width, size.height, x + i*12, y + i*12 + space, w, h)
			}
		}
	}
}

function poker_game(props){
    let self = this
    let images = []

	let canvas
	let ctx
	let canvas_width = 900
	let canvas_height = 500
	
	let card_list = []
	let card = {}
	let card_img = {width: 237, height: 365}
    
    let items = get_cards()
    let resize = 0

    this.ready = function(){
        resize++
		card_list = []
		self.createCanvas(canvas_width, canvas_height)
        if(!poker_status && resize === 1){
            //first time entering
            let promises = []
            for(let i in items){				
                promises.push(self.preaload_images(items[i]))
            }
            Promise.all(promises).then(function(result){
                images = result
                self.create_cards()
                self.draw_cards()
            })
        } else {
            // the game started
            self.create_cards()
            self.draw_cards()	
        }
    }

    this.createCanvas = function(canvas_width, canvas_height){		
        canvas = document.getElementById("poker_canvas")
		ctx = canvas.getContext("2d")	

		if(window.innerWidth <= 480){
			if(window.innerHeight < window.innerWidth){
				//extra small landscape				
				canvas.width = 400
				canvas.height = 200				
				card = {width: 33, height: 50}
			} else {
				//extra small portrait
				canvas.width = 300
				canvas.height = 200
			}			
		} else if (window.innerWidth <= 960){
			if(window.innerHeight < window.innerWidth){
				//small landscape				
				canvas.width = 480
				canvas.height = 220				
				card = {width: 40, height: 60}
			} else {
				//small portrait
				canvas.width = 300
				canvas.height = 200
			}
		} else if (window.innerWidth <= 1200){
			//big
			canvas.width = 900
			canvas.height = 450			
			card = {width: 80, height: 120}
		} else {
			//extra big
			canvas.width = 1200
			canvas.height = 500			
			card = {width: 100, height: 150}
		}
		
		canvas_width = canvas.width
		canvas_height = canvas.height	
		canvas.height = canvas_height
	}

    this.preaload_images = function(item){
		return new Promise(function(resolve, reject){
			let image = new Image()
			image.src = item.src
			image.addEventListener("load", function() {
				resolve({suit: item.suit, value: item.value, src: image})
			}, false)
		})
	}

    this.create_cards = function(x){
        let card_base = [
            {x: 0, y:0, width: 120, height: 180},
            {x: 0, y:0, width: 120, height: 180},
            {x: 0, y:0, width: 120, height: 180},
            {x: 0, y:0, width: 120, height: 180},
        ]        
		for(let i=0;i<4;i++){
			card_list.push(new Card({
				id: i,
				name: 'player',
				user: 'player_'+i,
				x: card_base.x, 
				y: card_base.y,
				width: card_base.width, 
				height: card_base.height, 
				card: card,
				card_img: card_img,
				images: images,
			}))
		}
	}

    this.draw_cards = function(){
		if(poker_data){
			for(let i in card_list){
				card_list[i].show_cards(ctx, poker_data)
			}
		}
	} 
    
    this.action = function(data){
		if(data.action){
			poker_data = data
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			if(data.action === "start"){
				resize = 0
			}		
			self.draw_cards()
			self.check_win_lose()
		}
    }

	this.check_win_lose = function(){
        let finished = false
		let game = null	
		if(props.page && props.page.game){
			game = props.page.game
		}
		let money = decryptData(props.user.money)

        let poker_payload = {
			uuid: props.user.uuid,
			game: game,
			status: 'lose',
			bet: poker_bets
		}
        if(finished && typeof props.getResults === "function"){
			//props.getResults(poker_payload)
		}
    }
}

var poker_data = null
var poker_bets = 0
var poker_status = false
function Poker5CardDraw(props){ 
    let game = props.page.game
	let money = decryptData(props.user.money)
	let [startGame, setStartGame]= useState(false)
    let dispatch = useDispatch()

	let clear = function(bet){
		poker_bets = bet
		if(poker_bets > 0){			
			let poker_payload = {
				uuid: props.user.uuid,
				game: game,
				status: 'lose',
				bet: poker_bets,
				money: money - poker_bets
			}
			props.results(poker_payload)
		}
	}

    let getResults = function(payload){
		props.results(payload)
		setStartGame(false)
	}
    let options = {...props, dispatch, getResults, clear}
    let my_poker = new poker_game(options)
    

    function ready(){
        if(my_poker && document.getElementById("poker_canvas")){
            my_poker.ready()
        }
    }

    useEffect(() => {
        ready()
        $(window).resize(function(){
			ready()
		})
		return () => {
			if(my_poker){
				clear(poker_bets) // if the user leaves the game, if he bet, he will lose the bets
				my_poker = null	
				poker_data = null
				poker_bets = 0
				poker_status = false	
			}
		}
    }, [])

    useEffect(() => {
		props.socket.on('poker_read', function(data){
			if(my_poker && data){
				if(data.action === "start"){
					my_poker.action(data)
				} else {
					//it means it must be an error
					let payload = {
						open: true,
						template: "error",
						title: translate({lang: props.lang, info: "error"}),
						data: translate({lang: props.lang, info: data.action})
					}
					dispatch(changePopup(payload))
				}
				
            }		
		})	
    }, [props.socket])

    function choice(type){		
        if(type === "start"){
            let poker_payload_server = {
                uuid: props.user.uuid,
                room: getRoom(game),
                action: type,
                bet: poker_bets
            }
			let payload = null
            switch (type) {
                case "start":
					if(poker_bets === 0){
						payload = {
							open: true,
							template: "error",
							title: translate({lang: props.lang, info: "error"}),
							data: translate({lang: props.lang, info: "no_bets"})
						}
						dispatch(changePopup(payload))
					} else {
						if(my_poker){                    
							if(!poker_status){
								props.socket.emit('poker_send', poker_payload_server)
								poker_status = true
								setStartGame(true)
							}
						}
					}                    
                    break
            }
			if(payload){
				dispatch(changePopup(payload))
			}
        }		
	}

    function updateBets(x){
        poker_bets = x
    }

    return <div className="game_container poker_container">
        <p>5 card draw</p>
        <img className="under_construction_icon" alt="under construction" src={under_construction_icon} />
        <canvas id="poker_canvas"></canvas>
        <GameBoard template="poker_5_card_draw" {...props} startGame={startGame} choice={(e)=>choice(e)} updateBets={(e)=>updateBets(e)}></GameBoard>
    </div>
}

export default Poker5CardDraw