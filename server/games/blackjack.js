function blackjack(data, how_lucky){
    let monkey_blackjack = false	
    let monkey = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_blackjack = true
    }
    
    if(monkey_blackjack){ // it means the player must lose
        
    }
    
    return {}
}

module.exports = {blackjack}