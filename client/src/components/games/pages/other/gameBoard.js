import React from 'react'
import { translate } from '../../../../translations/translate'
import { Button, Row, Col } from 'react-bootstrap'
import Counter from '../../../partials/counter'
import { decryptData } from '../../../../utils/crypto'

function GameBoard(props){
    const {template, lang, user} = props
    let max_bet = decryptData(user.money)

    function blackjackClick(e){        
        if(typeof props.choice === "function"){
            props.choice(e)
        }
    }
    function updateQtyMarket(e){
        if(typeof props.updateBets === "function"){
            props.updateBets(e)
        }
    }

    return <>
        {(() => {
            switch(template) {
                case "blackjack":
                    return <div className="gameboard">
                        <Row>
                        <Col sm={6}>
                            <p>{translate({lang: lang, info: "bet"})}</p>
                            <Counter max={max_bet} update={(e)=>updateQtyMarket(e)}></Counter>
                        </Col>
                        <Col sm={6}>
                            <Button type="button" onClick={()=>blackjackClick('start')} className="mybutton round button_transparent shadow_convex">
                                {translate({lang: lang, info: "start"})}
                            </Button>
                            <Button type="button" onClick={()=>blackjackClick('hit')} className="mybutton round button_transparent shadow_convex">
                                {translate({lang: lang, info: "hit"})}
                            </Button>
                            <Button type="button" onClick={()=>blackjackClick('stay')} className="mybutton round button_transparent shadow_convex">
                                {translate({lang: lang, info: "stay"})}
                            </Button>
                        </Col>                        
                    </Row>
                    </div>
                default: 
                    return <></>
            }
        })()}        
    </>
}

export default GameBoard