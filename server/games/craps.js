function craps(data, how_lucky){
    let monkey_craps = false	
    let monkey = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_craps = true
    }
    
    if(monkey_craps){ // it means the player must lose
        
    }
    
    return {}
}

module.exports = {craps}