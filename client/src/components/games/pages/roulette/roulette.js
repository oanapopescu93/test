import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { translate } from '../../../../translations/translate'
import GameBets from '../other/gameBets'
import RouletteGame from './rouletteGame'
import Dashboard from '../dashboard/dashboard'
import Market from '../market/market'
import { changeRouletteBets } from '../../../../reducers/games'

function Roulette(props){
    let game_page = useSelector(state => state.page.game_page)
    const [open, setOpen] = useState(false)
    let dispatch = useDispatch()
    let bets = useSelector(state => state.games.roulette.bets)	

    function getData(x){
        dispatch(changeRouletteBets(x))
	}

    function openTable(x){setOpen(true)}
    function closeTable(){setOpen(false)}
    
    function results(x){
        if(typeof props.results === "function"){
            props.results(x)
        }
    }

    return <>
        {!game_page ? <div className='game_container'>
            <RouletteGame {...props} bets={bets} openTable={()=>openTable()} results={(e)=>results(e)}></RouletteGame>
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