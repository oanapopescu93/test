function slots(data, how_lucky){
    let monkey_slots = false	
    let monkey = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_slots = true
    }
    
    if(monkey_slots){ // it means the player must lose
        
    }
    
    return {}
}

module.exports = {slots}