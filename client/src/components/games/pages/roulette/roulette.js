import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { translate } from '../../../../translations/translate'
import GameBets from '../other/gameBets'
import RouletteGame from './rouletteGame'
import Dashboard from '../dashboard/dashboard'
import Market from '../market/market'

function Roulette(props){
    let game_page = useSelector(state => state.page.game_page)
    const [bets, setBets] = useState([])
    const [open, setOpen] = useState(false)

    function getData(x){
        let array = [...x]
        setBets(array)
	}

    function openTable(x){setOpen(true)}
    function closeTable(){setOpen(false)}    

    return <>
        {!game_page ? <div className='game_container'>
            <RouletteGame {...props} bets={bets} openTable={()=>openTable()}></RouletteGame>
            <GameBets {...props} open={open} getData={(e)=>getData(e)} closeTable={()=>closeTable()}></GameBets>
        </div> : <>
        {(() => {
                switch (game_page) {
                    case "dashboard":
                        return <Dashboard {...props}></Dashboard>
                    case "market":
                        return <Market {...props}></Market>
                    default:
                        return <p>{translate({lang: props.lang, info: "error"})}</p>
                }
            })()}
        </>}
    </>
}

export default Roulette