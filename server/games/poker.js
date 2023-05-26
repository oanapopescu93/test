var poker_deck = []
var poker_players = []
var poker_dealer = {}
var poker_hidden_players = []
var poker_pot = 0
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let how_many_players = 4
let how_many_cards = 5
let how_many_rounds = 3

function poker(data, user_join){
    let poker_current_player = 0
    let poker_current_round = 0
    poker_hidden_players = []
    let index = null 

    switch (data.action) {
        case 'start':         
            poker_deck = createDeck(suits, values, 10000) 
            createPlayers()        
            dealHands()            
            handleBet()
        case "raise": 
        case "call":
        case "fold":
            index = poker_players.findIndex((x) => x.uuid === data.uuid)   
            if(data.action === "fold"){
                handleFold(index)
            } else {
                handleCallRaise(data, index)
            }
            nextTurn()
        case "replace":
            index = poker_players.findIndex((x) => x.uuid === data.uuid)    
            let cards_to_replace = []//to do
            replaceCards(index, cards_to_replace) 
    }    

    createHiddenPlayers()
    poker_hidden_players = evaluateHands(poker_hidden_players)         
    return {action: data.action, players: poker_hidden_players, dealer: poker_dealer, pot: poker_pot, player: poker_current_player, round: poker_current_round}
    
    function handleCallRaise(payload, index){
        if(poker_players[index]){
            let amount = poker_players[index].bet
            const maxBet = getBet()
            const amountToCall = maxBet - poker_players[index].bet

            if(payload.action === "raise" && amount <= amountToCall) {
                return {action: payload.action, error: 'invalid_raise'} //Invalid raise amount. Must raise more than the amount to call.
            }
            if(payload.action === "call" && poker_players[index].money < amountToCall) {
                return {action: payload.action, error: 'no_enough_money'} //Insufficient money to call.
            }
            
            // Update the player's bet and pot
            if(payload.action === "raise"){
                poker_players[index].bet += amount
                poker_pot += amount
            } else if(payload.action === "call"){
                poker_players[index].bet += amountToCall
                poker_pot += amountToCall
            }
        }
    }
    function getBet() {
        let bet = 0      
        for (let i in poker_players) {
            if (poker_players[i].bet > bet){
                bet = poker_players[i].bet
            }
        }      
        return bet
    }
    function handleFold(index){     
        //poker_players.splice(index, 1) 
        poker_players[index].fold = true
    }
    function nextTurn() {  
        poker_current_player++
        if(poker_current_player > poker_players.length){
            poker_current_player = 0
            poker_current_round++
        }
        if (poker_current_round > how_many_rounds) {
            showdown()
        } else {            
            //simulate bots making decisions
            for(let i=poker_current_player; i<poker_players.length; i++){                
                if(poker_players[i].uuid === "bot" && poker_players[i].fold){
                    let random_action = Math.floor(Math.random() * 100 + 1)
                    let random_bet = Math.floor(Math.random() * 10 + 1)
                    poker_players[i].bet = random_bet
                    let payload = {
                        bet: random_bet,
                        action: "call"
                    }
                    if(random_action<20){
                        handleFold(i)
                    } else {
                        if(random_action>=20 && random_action<60){
                            payload.action = "raise"
                        }
                        handleCallRaise(payload, i)
                    }
                }
            }
        }
    }    

    function handleBet(){
        let index = poker_players.findIndex((x) => x.uuid === data.uuid)
        poker_pot += poker_players[index].bet
    }
    function createDeck(suits, values, turns){
        for (let i = 0 ; i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                let weight = 0
                switch(values[i]){
                    case "J":
                        weight = 11
                        break    
                    case "Q":
                        weight = 12
                        break    
                    case "K":
                        weight = 13
                        break    
                    case "A":
                        weight = 14
                        break 
                    default:
                        weight = parseInt(values[i]) 
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
        poker_players = []
        for(let i=0; i<how_many_players;i++){
            let player = {user: "player_"+i, uuid: "bot", bet: 1, money: 100, fold: false} // if fewer than 4 players join, we add bots for the rest occupied sits
            if(user_join[i]){
                player = user_join[i]
                player.fold = false
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
                        poker_players[j].bet = data.bet
                    }	
                }	
                poker_players[j].hand.push(card)
            }
        }
        //sort hand after the value of the card
        poker_players.sort((a, b) => b.Weight - a.Weight)
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
    function evaluateHands(array){        
        for(let i in array){
            if(array[i].hand){
                array[i].handStrength = evaluateHand(array[i].hand)
            }
        }
        return array
    }
    function evaluateHand(hand){
        // Sort the hand by card weight in descending order
        hand.sort((a, b) => b.Weight - a.Weight)

        // Check for specific hand combinations in decreasing order of strength
        if (isRoyalFlush(hand)) return {text: 'Royal Flush', strength: 9}
        if (isStraightFlush(hand)) return {text: 'Straight Flush', strength: 8}
        if (isFourOfAKind(hand)) return {text: 'Four of a Kind', strength: 7}
        if (isFullHouse(hand)) return {text: 'Full House', strength: 6}
        if (isFlush(hand)) return {text: 'Flush', strength: 5}
        if (isStraight(hand)) return {text: 'Straight', strength: 4}
        if (isThreeOfAKind(hand)) return {text: 'Three of a Kind', strength: 3}
        if (isTwoPair(hand)) return {text: 'Two Pair', strength: 2}
        if (isOnePair(hand)) return {text: 'One Pair', strength: 1}

        // If none of the above combinations, it is a high card hand
        return {text: 'High Card', info: hand[0]}
    }
    // Helper functions to check hand combinations
    function isRoyalFlush(hand){
        const royalFlushValues = ['10', 'J', 'Q', 'K', 'A']
        const suits = new Set(hand.map((card) => card.Suit))
        if (suits.size !== 1) {
            return false // Not all cards have the same suit
        }
        const values = hand.map((card) => card.Value)
        const royalFlush = royalFlushValues.every((value) => values.includes(value))
        return royalFlush
    }    
    function isStraightFlush(hand){
        return isStraight(hand) && isFlush(hand)
    }
    function isFourOfAKind(hand){
        return countDuplicates(hand, 4)
    }
    function isFullHouse(hand){
        return countDuplicates(hand, 3) && countDuplicates(hand, 2)
    }
    function isFlush(hand){
        return hand.every((card) => card.Suit === hand[0].Suit)
    }
    function isStraight(hand){
        for (let i = 1; i < hand.length; i++) {
            if (hand[i].Weight !== hand[i - 1].Weight - 1){
                return false
            }
        }
        return true
    }  
    function isThreeOfAKind(hand){
        return countDuplicates(hand, 3)
    }
    function isTwoPair(hand){
        const pairs = countPairs(hand)
        return pairs === 2
    }  
    function isOnePair(hand){
        return countPairs(hand) === 1
    }  
    function countDuplicates(hand, count){
        const values = hand.map((card) => card.Value)
        const valueCounts = {}    
        for (const value of values) {
            valueCounts[value] = (valueCounts[value] || 0) + 1
        }    
        return Object.values(valueCounts).includes(count)
    }
    function countPairs(hand){
        const values = hand.map((card) => card.Value)
        const valueCounts = {}    
        for (const value of values) {
            valueCounts[value] = (valueCounts[value] || 0) + 1
        }    
        const pairs = Object.values(valueCounts).filter((count) => count === 2)
        return pairs.length
    }

    function replaceCards(index, cards_to_replace){
        if(poker_players[index]){
            for(let i in cards_to_replace){
                const index = poker_players.hand.findIndex((card) => card === cards_to_replace[i])
                if (index !== -1){
                    const newCard = deck.pop()
                    poker_players.hand[index] = newCard
                }
            }
        }
    }
    function showdown(){
        console.log('THE END')
    }
    
    return {}
}

module.exports = {poker}