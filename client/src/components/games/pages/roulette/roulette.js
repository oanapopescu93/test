import React, {useState} from 'react'
import GameBets from '../other/gameBets'
import RouletteGame from './rouletteGame'

function Roulette(props){
    const [bets, setBets] = useState([])
    const [open, setOpen] = useState(false)

    function getData(x){
        setBets(x)
	}

    function openTable(x){setOpen(true)}
    function closeTable(){setOpen(false)}

    return <div className='game_container'>
        <RouletteGame {...props} bets={bets} openTable={()=>openTable()}></RouletteGame>
        <GameBets {...props} open={open} getData={()=>getData()} closeTable={()=>closeTable()}></GameBets>
    </div>
}

export default Roulette