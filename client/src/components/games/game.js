import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { translate } from '../../translations/translate'
import { changePage, changeGame, changeGamePage } from '../../reducers/page'

import Header from '../partials/header'

import Roulette from './pages/roulette/roulette'
import Slots from './pages/slots/slots'
import Craps from './pages/craps/craps'
import Race from './pages/race/race'
import Keno from './pages/keno/keno'
import Panel from './sidebar/panel'
import Blackjack from './pages/blackjack/blackjack'
import { getRoom } from './game_utils'

function Game(props){
    const {lang, page, socket} = props
    let game = page.game
    let title = game.table_name ? game.table_name : ""
    let dispatch = useDispatch()

    function results(payload){
        if(payload && payload.bet && payload.bet>0){ //send results to server only if he bet
            socket.emit('game_results_send', payload)
        }
    }

    function handleExit(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    useEffect(() => {
        socket.emit('join_room', getRoom(game)) 
        return () => {
			socket.emit('leave_room', getRoom(game)) 
		} 
    }, [])      

    return <>
        <div className="content_wrap">
            <Header template="game" details={page} lang={lang}></Header>
            {(() => {
                switch (title) {
                    case "roulette":
                        return <Roulette {...props} results={(e)=>results(e)}></Roulette>
                    case "blackjack":
                        return <Blackjack {...props} results={(e)=>results(e)}></Blackjack>
                    case "slots":
                        return <Slots {...props} results={(e)=>results(e)}></Slots>
                    case "craps":
                        return <Craps {...props} results={(e)=>results(e)}></Craps>
                    case "race":
                        return <Race {...props} results={(e)=>results(e)}></Race>
                    case "keno":
                        return <Keno {...props} results={(e)=>results(e)}></Keno>
                    default:
                        return <p>{translate({lang: lang, info: "error"})}</p>
                }
            })()}
            <div className="page_exit">
                <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent shadow_convex">
                    {translate({lang: lang, info: "exit_game"})}
                </Button>
            </div>
        </div>
        <Panel {...props}></Panel>
    </>
}

export default Game