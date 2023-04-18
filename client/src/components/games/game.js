import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { translate } from '../../translations/translate'
import { changeGame, changePage } from '../../reducers/page'

import Header from '../partials/header'

import Roulette from './pages/roulette/roulette'
import Slots from './pages/slots/slots'
import Craps from './pages/craps/craps'
import Race from './pages/race/race'
import Keno from './pages/keno/keno'
import Panel from './sidebar/panel'
import Blackjack from './pages/blackjack/blackjack'

function Game(props){
    const {lang, page, user} = props
    let game = page.game
    let title = game.table_name ? game.table_name : ""
    const [bets, setBets] = useState([])
    let dispatch = useDispatch()

    function results(x){
        //will do
        console.log('results--> ', x)
    }

    function handleExit(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
    }

    useEffect(() => {
        return () => {            
            if(bets && bets.length>0){ // meaning he actually bet and started playing
                let payload = {win: false, user, game, bets}
                results(payload)
            }
        }
    }, [])

    function getBets(x){
        setBets(x)
    }

    return <>
        <div className="content_wrap">
            <Header template="game" details={page} lang={lang}></Header>
            {(() => {
                switch (title) {
                    case "roulette":
                        return <Roulette {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Roulette>
                    case "blackjack":
                        return <Blackjack {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Blackjack>
                    case "slots":
                        return <Slots {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Slots>
                    case "craps":
                        return <Craps {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Craps>
                    case "race":
                        return <Race {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Race>
                    case "keno":
                        return <Keno {...props} getBets={(e)=>getBets(e)} results={(e)=>results(e)}></Keno>
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