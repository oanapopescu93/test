function blackjack(data, how_lucky, user_join){
    console.log(data, how_lucky, user_join)
    let blackjack_deck = new Array()
    let hidden_dealer = {}
    let blackjack_current_player = 0
    let blackjack_players = []
    let blackjack_dealer = {}

    let monkey_blackjack = false	
    let monkey = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_blackjack = true
    }
    
    if(monkey_blackjack){ // it means the player must lose
        
    }

    switch (data.action) {
        case 'start':
            let suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
            let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

            blackjack_deck = createDeck(suits, values, 10000)

            blackjack_players = []
            blackjack_players = user_join
            dealHands()

            hidden_dealer.id = blackjack_dealer.id
            hidden_dealer.hand = []
            hidden_dealer.hand.push(blackjack_dealer.hand[0])

            return {action: data.action, blackjack_players, hidden_dealer}
        case 'hit':
            hitMe()
        case 'stay':
            
    }

    function createDeck(suits, values, turns){
        blackjack_deck = new Array()
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
                blackjack_deck.push(card)
            }
        }		
        return shuffle(turns)
    }		
    function shuffle(turns){ 
        for (let i = 0; i < turns; i++){
            let a = Math.floor((Math.random() * blackjack_deck.length))
            let b = Math.floor((Math.random() * blackjack_deck.length))
            let tmp = blackjack_deck[a]		
            blackjack_deck[a] = blackjack_deck[b]
            blackjack_deck[b] = tmp
        }
        return blackjack_deck
    }		
    function dealHands(){
        blackjack_dealer = {id: "dealer", hand: []}			
        for(let i = 0; i < 2; i++){	
            let card = blackjack_deck.pop()
            blackjack_dealer.hand.push(card)
            for (let j = 0; j < blackjack_players.length; j++){
                let card = blackjack_deck.pop()
                if(i === 0){
                    blackjack_players[j].hand = []
                } else {
                    if(data[1].uuid == blackjack_players[j].uuid){
                        blackjack_players[j].bets = data[1].bets
                    }	
                }	
                blackjack_players[j].hand.push(card)
            }
        }
    }	

    function hitMe(){

    }
    
    return {}
}

module.exports = {blackjack}