const { sort_array_obj } = require("../utils/other")

var poker_deck = []
var poker_players = []
var poker_dealer = {}
var poker_hidden_players = []

function poker(data, user_join){
    let poker_current_player = 0
    let how_many_players = 4
    let how_many_cards = 5

    switch (data.action) {
        case 'start':
            let suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
            let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
            poker_deck = createDeck(suits, values, 10000) 
            createPlayers()
            dealHands() 
            sortHands()
            createHiddenPlayers()  
            poker_hidden_players = checkPrize(poker_hidden_players)         
            return {action: data.action, players: poker_hidden_players, dealer: poker_dealer}
    }

    function createDeck(suits, values, turns){
        for (let i = 0 ; i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                let weight = parseInt(values[i])
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K"){
                    weight = 10		
                }
                if (values[i] == "A"){
                    weight = 11				
                }
                let card = { Value: values[i], Suit: suits[j], Weight: weight }
                poker_deck.push(card)
            }
        }		
        return shuffle(turns)
    }		
    function shuffle(turns){ 
        for (let i = 0; i < turns; i++){
            let a = Math.floor((Math.random() * poker_deck.length))
            let b = Math.floor((Math.random() * poker_deck.length))
            let tmp = poker_deck[a]		
            poker_deck[a] = poker_deck[b]
            poker_deck[b] = tmp
        }
        return poker_deck
    }
    function createPlayers(){
        for(let i=0; i<how_many_players;i++){
            let player = {user: "player_"+i, bet: 1}
            if(user_join[i]){
                player = user_join[i]
            }
            poker_players.push(player)
        }
    }		
    function dealHands(){
        poker_dealer = {id: "dealer", hand: []}		
        for(let i = 0; i < how_many_cards; i++){
            if(i<3){//the dealer will show 3 cards at the start of the game
                let card = poker_deck.pop()
                poker_dealer.hand.push(card)
            }
            for (let j = 0; j < poker_players.length; j++){
                let card = poker_deck.pop()
                if(i === 0){
                    poker_players[j].hand = []
                } else {
                    if(data.uuid == poker_players[j].uuid){
                        poker_players[j].bets = data.bet
                    }	
                }	
                poker_players[j].hand.push(card)
            }
        }
    }

    function sortHands(){        
        for(let i in poker_players){            
            poker_players[i].hand = sort_array_obj(poker_players[i].hand, "Value")
        }
    }

    function createHiddenPlayers(){
        for(let i in poker_players){
            if(data.uuid === poker_players[i].uuid){
                poker_hidden_players.push(poker_players[i])
            } else {
                poker_hidden_players.push({...poker_players[i], hand: null})
            }
        }
    }

    function checkPrize(array){        
        for(let i in array){
            if(array[i].hand !== "hidden"){
                array[i].evaluateHand = evaluateHand(array[i].hand)
            }
        }
        return array
    }

    function evaluateHand(hand){//1, 2, 3, 4, 6, 9, 25, 50, 250
        return {hasOfKind: hasOfKind(hand), hasFlush: hasFlush(hand), hasSequence: hasSequence(hand)}
    }
    function hasOfKind(hand){//checkes groups of same values
        if(hand){
            const results = hand.reduce((a, e) => {
                a[e.Value] = ++a[e.Value] || 0
                return a
            }, {})
            return results
        } else {
            return null
        }        
    }
    function hasFlush(hand){//has five of same suit
        let spades = 0
        let hearts = 0
        let diamonds = 0
        let clubs = 0
        if(hand){
            for(let i in hand){
                switch(hand[i].Suit){
                    case "Spades":
                        spades++
                        break
                    case "Hearts":
                        hearts++
                        break
                    case "Diamonds":
                        diamonds++
                        break
                    case "Clubs":
                        clubs++
                        break
                }
            }        
            if(spades >= 5){return {flush: "spades"}}
            if(hearts >= 5){return {flush: "hearts"}}
            if(diamonds >= 5){return {flush: "diamonds"}}
            if(clubs >= 5){return {flush: "clubs"}}
        }        
        return {flush: null}
    }
    function hasSequence(hand){
        if(hand){
            let t = true
            for(let i = 1; i < hand.length; i++) {
                if (hand[i].Value - hand[i-1].Value !== 1) {
                t = false
                break
                }
            }
            return t
        } else {
            return false
        }
    }
    
    return {}
}

module.exports = {poker}