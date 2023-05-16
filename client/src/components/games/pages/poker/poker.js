import React from 'react'
import PokerTexasHoldem from './poker_texas_holdem'
import Poker5CardDraw from './poker_5_card_draw'

function Poker(props){ 
    const {page} = props
    let table_type = page.game.table_type //texas holdem or 5 card draw

    return <>
        {(() => {            
            switch(table_type) {
                case "texas holdem":
                    return <PokerTexasHoldem {...props}></PokerTexasHoldem>
                case "5 card draw":
                default: 
                    return <Poker5CardDraw {...props}></Poker5CardDraw>
            }
        })()}
    </>
}

export default Poker