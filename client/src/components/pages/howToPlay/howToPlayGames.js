import React from 'react'
import RouletteEng from './games/roulette/rouletteEng'
import RouletteRo from './games/roulette/rouletteRo'
import BlackjackEng from './games/blackjack/blackjackEng'
import BlackjackRo from './games/blackjack/blackjackRo'
import SlotsEng from './games/slots/slotsEng'
import SlotsRo from './games/slots/slotsRo'
import CrapsEng from './games/craps/crapsEng'
import CrapsRo from './games/craps/crapsRo'
import RaceEng from './games/race/raceEng'
import RaceRo from './games/race/raceRo'
import KenoEng from './games/keno/kenoEng'
import KenoRo from './games/keno/kenoRo'
import PokerEng from './games/poker/pokerEng'
import PokerRo from './games/poker/pokerRo'

function HowToPlayGames(props){
    const {game, lang} = props

    return <div className="list_games_table">
        {(() => {
            switch (lang) {
                case "RO":
                    switch (game) {
                        case "roulette":
                            return <RouletteRo></RouletteRo>
                        case "blackjack":
                            return  <BlackjackRo></BlackjackRo>
                        case "slots":
                            return <SlotsRo></SlotsRo>
                        case "craps":
                            return  <CrapsRo></CrapsRo>
                        case "race":
                            return <RaceRo></RaceRo>
                        case "keno":
                            return  <KenoRo></KenoRo>
                        case "poker":
                            return  <PokerRo></PokerRo>
                        default:
                            return null
                    }
                case "ENG":
                default:
                    switch (game) {
                        case "roulette":
                            return <RouletteEng></RouletteEng>
                        case "blackjack":
                            return  <BlackjackEng></BlackjackEng>
                        case "slots":
                            return <SlotsEng></SlotsEng>
                        case "craps":
                            return  <CrapsEng></CrapsEng>
                        case "race":
                            return <RaceEng></RaceEng>
                        case "keno":
                            return  <KenoEng></KenoEng>
                        case "poker":
                            return  <PokerEng></PokerEng>
                        default:
                            return null
                    }
            }            
        })()}       
    </div>
}
export default HowToPlayGames