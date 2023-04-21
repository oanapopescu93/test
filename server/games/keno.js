function keno(data, how_lucky){
    let monkey_keno = false	
    let monkey = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_keno = true
    }
    
    if(monkey_keno){ // it means the player must lose
        
    }
    
    return {}
}

module.exports = {keno}