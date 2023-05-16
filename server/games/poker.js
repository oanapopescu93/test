var poker_deck = []
var poker_players = []

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
            return {action: data.action, players: poker_players}
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
        for(let i = 0; i < how_many_cards; i++){	
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
        check()
    }

    function check(){
        for(let i in poker_players){
            if(hasJacksOfBetter(poker_players[i].hand)){
                poker_players[i].prize = 1
            }
            if(has2Pair(poker_players[i].hand)){
                poker_players[i].prize = 2
            }
            if(has3ofKind(poker_players[i].hand)){
                poker_players[i].prize = 3
            }
            if(hasStraight(poker_players[i].hand)){
                poker_players[i].prize = 4
            }
            if(hasFlush(poker_players[i].hand)){
                poker_players[i].prize = 6
            }
            if(hasFullHouse(poker_players[i].hand)){
                poker_players[i].prize = 9
            }
            if(has4ofKind(poker_players[i].hand)){
                poker_players[i].prize = 25
            }
            if(hasStraightFlush(poker_players[i].hand)){
                poker_players[i].prize = 50
            }
            if(hasRoyalFlush(poker_players[i].hand)){
                poker_players[i].prize = 250
            }
        }
    }
    function hasJacksOfBetter(hand) {
        return false
    }
    function has2Pair(hand){
        return false
    }
    function has3ofKind(hand){
        return false
    }
    function hasStraight(hand){
        return false
    }
    function hasFlush(hand){
        return false
    }
    function hasFullHouse(hand){
        return false
    }
    function has4ofKind(hand){
        return false
    }
    function hasStraightFlush(hand){
        return false
    }
    function hasRoyalFlush(hand){
        return false
    }
    
    return {}
}

module.exports = {poker}