import React, {useState, useEffect} from 'react'
import GameBoard from '../other/gameBoard'
import { useDispatch } from 'react-redux'
import { decryptData } from '../../../../utils/crypto'
import $ from "jquery"
import { draw_rect, getMousePos, getRoom, get_cards, isInside } from '../../../../utils/games'
import { translate } from '../../../../translations/translate'
import { changePopup } from '../../../../reducers/popup'

function Card(config){
	let self = this
	self.id = config.id
    self.uuid = config.uuid
	self.name = config.name
	self.user = config.user
    self.props = config.props
	
	self.x = config.x
	self.y = config.y
	self.width = config.width
	self.height = config.height
	self.card = config.card //The size of the clipped image
	self.card_img = config.card_img //The size of the image to use
	self.images = config.images
    self.space = config.space
    self.text_color = config.text_color
    self.text_bg = config.text_bg
	self.text_font = config.text_font
    self.text_x = config.text_x
    self.text_y = config.text_y

    self.hand = config.hand
    self.selectedCards = []
    self.fold = config.fold

	self.show_cards = function(ctx, data){
        if(self.id !== -1){
            //player
            if(self.uuid === self.props.user.uuid){
                let cards_number = self.hand.length
                let hand_length = (cards_number-1) * self.card.width + (cards_number-2) * self.space
                self.draw_card(ctx, self.x-hand_length/2, self.y, self.card.width, self.card.height, self.card_img, self.hand, self.fold)
                self.draw_card_text(ctx, self.user, self.text_x-hand_length/2, self.text_y, 70, 12)                    
            } else {
                self.draw_card(ctx, self.x, self.y, self.card.width, self.card.height, self.card_img, self.hand, self.fold)
                self.draw_card_text(ctx, self.user, self.text_x, self.text_y, 70, 12)
            }
        } else {
            //dealer
            let cards_number = data.dealer.hand.length
            let hand_length = (cards_number-1) * self.card.width + (cards_number-2) * self.space
            self.draw_card(ctx, self.x-hand_length/2, self.y, self.card.width, self.card.height, self.card_img, data.dealer.hand, "dealer")
        }
			
	}

	this.draw_card = function(ctx, x, y, w, h, size, hand, fold){
		let img = self.images
		let img_index = 0
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
            
            if(self.id !== -1){                
                //player
                if(fold){ //if the player folded, his cards will be grey
                    ctx.filter = 'grayscale(1)'
                }
                if(self.uuid === self.props.user.uuid){
                    ctx.drawImage(img[img_index].src, 0, 0, size.width, size.height, x + i * (self.space + w), y, w, h)
                    self.updateHand(i, x + i * (self.space + w), y, w, h)
                } else {
                    ctx.drawImage(img[img_index].src, 0, 0, size.width, size.height, x + i * self.space, y, w, h)
                    self.updateHand(i, x + i * self.space, y, w, h)
                }
                ctx.filter = 'grayscale(0)'
            } else {
                //dealer
                if(!img[img_index]){
                    console.log(img, img_index, img[img_index])
                }
                ctx.drawImage(img[img_index].src, 0, 0, size.width, size.height, x + i * (self.space + w), y, w, h)
                self.updateHand(i, x + i * (self.space + w), y, w, h)
            }
        }        
	}

    self.draw_card_text = function(ctx, text, x, y, w, h){	
		ctx.beginPath()
		ctx.fillStyle = self.text_bg
        ctx.fillRect(x, y, w, h)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = self.text_color
		ctx.font = self.text_font
		ctx.fillText(text, x+5, y+8)
		ctx.closePath()
	}

    self.updateHand = function(i, x, y, w, h){        
        self.hand[i].x = x
        self.hand[i].y = y
        self.hand[i].width = w
        self.hand[i].height = h
    }

    self.updateSelected = function(x){ 
        let index = self.selectedCards.findIndex((i) => i === x)     
        if(index === -1){
            self.selectedCards.push(x)
        } else {
            self.selectedCards.splice(index, 1)
        }
    }
}

var card_list = []
function poker_game(props){
    let self = this
    let images = []

	let canvas
	let ctx
	let canvas_width = 900
	let canvas_height = 500	
	
	let card = {}
	let card_img = {width: 237, height: 365}
    let card_base = {width: 120, height: 180, space: 35}
    let space = 12
    let positions = []
    
    let items = get_cards()

    this.ready = function(){
		card_list = []
		self.createCanvas(canvas_width, canvas_height)
        self.drawBackground()
        self.handleClick()
        if(!poker_status){
            //first time entering
            let promises = []
            for(let i in items){				
                promises.push(self.preaload_images(items[i]))
            }
            Promise.all(promises).then(function(result){
                images = result
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
            card = {width: 33, height: 50}
            card_base = {width: 46, height: 70, space: 15}
            space = 8
			if(window.innerHeight < window.innerWidth){
				//extra small landscape				
				canvas.width = 400
				canvas.height = 200	
			} else {
				//extra small portrait
				canvas.width = 300
				canvas.height = 200
			}			
		} else if (window.innerWidth <= 960){
            card = {width: 40, height: 60}
            card_base = {width: 53, height: 80, space: 15}
            space = 10
			if(window.innerHeight < window.innerWidth){
				//small landscape				
				canvas.width = 480
				canvas.height = 220	
			} else {
				//small portrait
				canvas.width = 300
				canvas.height = 200
			}
		} else if (window.innerWidth <= 1200){
			//big
			canvas.width = 900
			canvas.height = 450			
			card = {width: 70, height: 105}
            card_base = {width: 120, height: 180, space: 25}
            space = 10
		} else {
			//extra big
			canvas.width = 1200
			canvas.height = 500			
			card = {width: 70, height: 105}
            card_base = {width: 80, height: 120, space: 25}
            space = 10
            
		}
		
		canvas_width = canvas.width
		canvas_height = canvas.height	
		canvas.height = canvas_height

        positions = [
            {x: canvas.width/2 - card.width/2, y: canvas.height - card.height - card_base.space, width: card_base.width, height: card_base.height}, //bottom
            {x: card_base.space, y: canvas.height/2 - card.height/2, width: card_base.width, height: card_base.height}, //left
            {x: canvas.width/2 - card.width/2, y: card_base.space, width: card_base.width, height: card_base.height}, //top
            {x: canvas.width - card.width - 2 * card_base.space, y: canvas.height/2 - card.height/2, width: card_base.width, height: card_base.height}, //right
        ] 
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

    this.drawBackground = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "darkgreen"
        ctx.shadowBlur = 20
        ctx.shadowColor = "black"
        ctx.shadowOffsetY = 10
        ctx.beginPath()
        ctx.ellipse(canvas.width/2, canvas.height/2, canvas.width/2-2*card_base.space, canvas.height/2-2*card_base.space, 0, 0, 2 * Math.PI) 
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.shadowColor = "transparent"
        ctx.shadowOffsetY = 0
        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.ellipse(canvas.width/2, canvas.height/2, canvas.width/2-4*card_base.space, canvas.height/2-3*card_base.space, 0, 0, 2 * Math.PI)  
        ctx.fill()
    }

    this.create_cards = function(){   
        card_list = []      
        if(poker_data){
            // create dealer
            card_list.push(new Card({
                id: -1,
                name: 'dealer',
                x: canvas.width/2 - card.width/2, 
                y: canvas.height/2 - card.height/2, 
                width: positions[0].width, 
                height: positions[0].height, 
                card: card,
                card_img: card_img,
                images: images,
                space: space,
                hand: poker_data.dealer.hand
            }))	
            
            //players
            for(let i=0;i<4;i++){
                if(positions[i] && poker_data.players[i]){ 
                    let uuid = null 
                    let user = 'player_'+i
                    let evaluateHand = null
                    if(poker_data.players && poker_data.players[i] && props.user.uuid === poker_data.players[i].uuid){
                        uuid = poker_data.players[i].uuid
                        user = decryptData(poker_data.players[i].user)
                        evaluateHand = poker_data.players[i].evaluateHand
                    } 
                    let hand = []
                    if(poker_data.players[i].hand){
                        hand = poker_data.players[i].hand
                    } else {
                        hand = [{Value: null}, {Value: null}, {Value: null}, {Value: null}, {Value: null}]
                    }
                    let fold = false
                    if(poker_data.players[i].fold){
                        fold = true
                    }
                    card_list.push(new Card({
                        id: i,
                        name: 'player',
                        uuid: uuid,
                        user: user,
                        x: positions[i].x, 
                        y: positions[i].y,
                        width: positions[i].width, 
                        height: positions[i].height, 
                        card: card,
                        card_img: card_img,
                        images: images,
                        space: space,
                        text_color: "black",
                        text_bg: "white",
                        text_font: 'bold 10px sans-serif',
                        text_x: positions[i].x,
                        text_y: positions[i].y - 2*space,
                        props: props,
                        evaluateHand: evaluateHand,
                        hand: hand,
                        fold: fold
                    }))
                }
            }
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
        console.log('action--> ', data, data.player, data.round)
		if(data && data.action){
            poker_data = data
            self.drawBackground()
            self.create_cards()
            self.draw_cards()
		}
    }

    this.handleClick = function(){
        if($('#poker_canvas')){
            $('#poker_canvas').off('click').on('click', function(event) {
                let mousePos = getMousePos(canvas, event)
                self.canvas_click(mousePos)
            })
        }		
    }

    this.canvas_click = function(mouse){ 
        for(let i in card_list){
			let hand = card_list[i].hand
            if(card_list[i].uuid === props.user.uuid){
                for(let j in hand){
                    if(isInside(mouse, hand[j])){
                        card_list[i].updateSelected(j) 
                        self.drawBackground()
                        self.draw_cards()
                        let selectedCards = card_list[i].selectedCards
                        for(let k in selectedCards){
                            let t = selectedCards[k]
                            let card = card_list[i].hand[t]
                            draw_rect(ctx, card.x, card.y, card.width, card.height, "transparent", 3, "red")
                        }
                    }
                }
            }
		}
    }

    this.getReplaceCards = function(){
        let replaceCards = []
        for(let i in card_list){
            if(card_list[i].uuid === props.user.uuid){
                replaceCards = card_list[i].selectedCards
                break
            }
        }
        return replaceCards
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
    let [round, setRound]= useState(0)
    let [spectator, setSpectator]= useState(false)
    let dispatch = useDispatch()  
    let [draw, setDraw]= useState(false)    

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
			//props.results(poker_payload)
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
                if(data.action === "start" || data.action === "call" || data.action === "raise" || data.action === "fold" || data.action === "replace"){
                    my_poker.action(data)
                    setRound(data.round)
                    if(data.action === "fold"){ //the user decided to quit --> he loses his bet  
                        let poker_payload = {
                            uuid: props.user.uuid,
                            game: game,
                            status: 'lose',
                            bet: poker_bets,
                            money: money - poker_bets
                        }
                        //props.results(poker_payload)
                    }				
                } else {
                    //it means it must be an error, if the user folds, he just loses the money without payload to server
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
        if(type === "start" || type === "fold" || type === "call" || type === "raise" || type === "replace"){
            if(my_poker){
                let poker_payload_server = {
                    uuid: props.user.uuid,
                    room: getRoom(game),
                    action: type,
                    bet: poker_bets,
                    money: money
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
                            if(!poker_status){                                
                                props.socket.emit('poker_send', poker_payload_server)
                                poker_status = true
                                setStartGame(true)
                            }
                        }                    
                        break
                    case "fold": 
                    case "call":
                    case "raise":
                    case "replace":
                        if(type === "replace"){
                            poker_payload_server.replaceCards = my_poker.getReplaceCards()
                        }
                        props.socket.emit('poker_send', poker_payload_server)
                        if(type === "fold"){
                            setSpectator(true)
                        }
                        break
                }
                if(payload){
                    dispatch(changePopup(payload))
                }
            }
        }		
	}

    function updateBets(x){
        poker_bets = x
    }

    return <div className="game_container poker_container">
        <canvas id="poker_canvas"></canvas>
        {!spectator ? <GameBoard 
            template="poker_5_card_draw" 
            {...props} 
            startGame={startGame} 
            round={round}
            choice={(e)=>choice(e)} 
            updateBets={(e)=>updateBets(e)}
        ></GameBoard> : null}
    </div>
}

export default Poker5CardDraw