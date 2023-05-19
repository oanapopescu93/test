import React from 'react'
import { translate } from '../../../../translations/translate'
import { Button, Row, Col } from 'react-bootstrap'
import Counter from '../../../partials/counter'
import { decryptData } from '../../../../utils/crypto'

function PokerBoard(props){
    const {template, lang, user, startGame, action} = props
    let max_bet = decryptData(user.money)
    console.log('action--> ', action)

    function handleClick(e){        
        if(typeof props.choice === "function"){
            props.choice(e)
        }
    }
    function updateQtyMarket(e){
        if(typeof props.updateBets === "function"){
            props.updateBets(e)
        }
    }

    return <Row>
        {startGame ? <>
            <Col xs={4}>
                <div  className="button_box">
                    <Button type="button" onClick={()=>handleClick('call')} className="mybutton button_fullcolor shadow_convex">
                        {translate({lang: lang, info: "call"})}
                    </Button>
                </div>
            </Col>
            <Col xs={4}>
                <div  className="button_box">
                    <Button type="button" onClick={()=>handleClick('raise')} className="mybutton button_fullcolor shadow_convex">
                        {translate({lang: lang, info: "raise"})}
                    </Button>
                </div>
            </Col>
            <Col xs={4}>
                <div  className="button_box">
                    <Button type="button" onClick={()=>handleClick('fold')} className="mybutton button_fullcolor shadow_convex">
                        {translate({lang: lang, info: "fold"})}
                    </Button>
                </div>
            </Col>
        </> : <>
            <Col xs={4}>
                <Counter num={0} max={max_bet} update={(e)=>updateQtyMarket(e)}></Counter>
            </Col>
            <Col xs={4}></Col>
            <Col xs={4}>
                <div  className="button_box">
                    <Button type="button" onClick={()=>handleClick('start')} className="mybutton button_fullcolor shadow_convex">
                        {translate({lang: lang, info: "start"})}
                    </Button>
                </div>
            </Col>
        </>}
    </Row>
}

export default PokerBoard