import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { translate } from '../../../translations/translate'
import { changeGame, changePage } from '../../../reducers/page'

import Sapou from '../../partials/sapou'

import Roulette from './roulette'
import Blackjack from './blackjack'
import Slots from './slots'
import Craps from './craps'
import Race from './race'
import Keno from './keno'

function Game(props){
    const {lang, template} = props
    let dispatch = useDispatch()

    function results(x){
        //will do
        console.log('results--> ', x)
    }

    function handleExit(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
    }

    return <div className="content_wrap">
        <Sapou template={template} lang={lang}></Sapou>
        {(() => {
            switch (template) {
                case "roulette":
                    return <Roulette lang={lang} results={(e)=>results(e)}></Roulette>
                case "blackjack":
                    return <Blackjack lang={lang} results={(e)=>results(e)}></Blackjack>
                case "slots":
                    return <Slots lang={lang} results={(e)=>results(e)}></Slots>
                case "craps":
                    return <Craps lang={lang} results={(e)=>results(e)}></Craps>
                case "race":
                    return <Race lang={lang} results={(e)=>results(e)}></Race>
                case "keno":
                    return <Keno lang={lang} results={(e)=>results(e)}></Keno>
                default:
                    return <p>{translate({lang: lang, info: "error"})}</p>
            }
        })()} 
        <div className="page_exit">
            <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent">
                {translate({lang: lang, info: "exit_game"})}
            </Button>
        </div>
    </div>
}

export default Game