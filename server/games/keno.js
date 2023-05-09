function keno(data, how_lucky){
    let monkey_keno = false	
    let monkey = []
    let arr = []
    let is_lucky = Math.floor(Math.random() * 100)
    if(is_lucky % how_lucky === 0){
        monkey_keno = true
    }
    
    if(monkey_keno){ // it means the player must lose
        
    } else {
        while(arr.length < data.length){
            let r = Math.floor(Math.random() * data.max) + 1
            if(arr.indexOf(r) === -1) arr.push(r)
        }
    }
    
    return arr
}

module.exports = {keno}