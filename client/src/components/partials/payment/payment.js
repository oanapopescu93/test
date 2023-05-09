import React, { useState } from 'react'
import { translate } from '../../../translations/translate'
import PaymentForm from './paymentForm'
import { Col, Row, Button } from 'react-bootstrap'
import Counter from '../counter'
import { useDispatch } from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import $ from "jquery"
import { decryptData } from '../../../utils/crypto'
import { isEmpty, postData } from '../../../utils/utils'
import { validateCVV, validateCard, validateInput } from '../../../utils/validate'
import { changePopup } from '../../../reducers/popup'
import PaymentCart from './paymentCart'

function Payment(props){
    const {lang, user, template} = props
    let dispatch = useDispatch()
    let max_bet = decryptData(user.money)
    let price_per_carrot = 1
    const [qty, setQty] = useState(1)
    const [amount, setAmount] = useState(price_per_carrot)       
    const [month, setMonth] = useState(-1)    
    const [year, setYear] = useState("")    
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [cardNumberError, setCardNumberError] = useState(false)
    const [cvvError, setCvvError] = useState(false)
    const [monthError, setMonthError] = useState(false)   
    const [yearError, setYearError] = useState(false)
    const [gateway, setGateway] = useState("stripe")

    function getChanges(data){
        let type = data.type
        let value = data.value
        switch(type){
            case "month":
                setMonth(value)
                break
            case "year":
                setYear(value)
                break
            case "gateway":
                setGateway(value)
                break
            default:
        }
    }

    function updateQty(x){
        setQty(x)
        setAmount(x * price_per_carrot)
    }

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    function handleSubmit(){
        if($('#payment_form') && qty > 0){
            let form = $('#payment_form').serializeArray()
            let payload = {
                firstname: getValueFromForm(form, 'name'),
                email: getValueFromForm(form, 'email'),
                cardNumber: getValueFromForm(form, 'card_number'),
                cvv: getValueFromForm(form, 'cvv'),
                expiry_month: month,
                expiry_year: year,
            }       
            validate(payload)
        }
    }

    function getValueFromForm(form, name){
        for(let i in form){
            if(form[i].name === name){
                return form[i].value
            }
        }
    }
    function validate(data){
        let problem = false
        if(isEmpty(data.name)){
            setNameError(true)
            problem = true
        }
        if(isEmpty(data.email) || !validateInput(data.email, "email")){
            setEmailError(true)
            problem = true
        }
        if(!data.radio1){
            if(isEmpty(data.card_number)){
                setCardNumberError(true)
                problem = true
            } else {
                if(!validateCard(data.card_number)){
                    setCardNumberError(true)
                    problem = true
                }     
                if(!validateCVV(data.card_number, data.cvv)){
                    setCvvError(true)
                    problem = true
                }
            }
            
            if(month === -1){
                setMonthError(true)
                problem = true
            }        
            if(isEmpty(year)){
                setYearError(true)
                problem = true
            }
        }

        //sendPayload(data)//for fast tests (the errors will appear but the pay will be sent)
        if(!problem){
            let payload = data
            sendPayload(payload)
        }
    }

    function sendPayload(payload){        
        if(amount > 0){ // something is wrong and we can't charge client (ex: somehow the cart is empty, so, the total amount is 0)
            let url = ""
            switch(gateway){
                case "stripe":
                    url = "/api/stripe"
                    break
                case "paypal":
                    url = "/api/paypal"                    
                    break
                case "crypto":
                    url = "/api/crypto"
                    break
                default:                    
            }
            console.log(gateway, payload, amount, url)   
            if(!isEmpty(url)){
                postData(url, payload).then((data) => {
                    if(data && data.forwardLink){
                        window.location.href = data.forwardLink
                    } else {
                        let payload = {
                            open: true,
                            template: "error",
                            title: translate({lang: props.lang, info: "error"}),
                            data: translate({lang: props.lang, info: "error_charge"})
                        }
                        dispatch(changePopup(payload))
                    }
                })
            } else {
                let payload = {
                    open: true,
                    template: "error",
                    title: translate({lang: props.lang, info: "error"}),
                    data: translate(translate({lang: lang, info: "no_payment_methods"}))
                }
                dispatch(changePopup(payload))
            }
        } else {
            let payload = {
                open: true,
                template: "error",
                title: translate({lang: props.lang, info: "error3"}),
                data: translate({lang: props.lang, info: "error_charge"})
            }
            dispatch(changePopup(payload))
        }
    }

    return<Row>
        <Col sm={8}>
            <PaymentForm 
                {...props} 
                getChanges={(e)=>getChanges(e)}
                nameError={nameError} 
                emailError={emailError} 
                cardNumberError={cardNumberError} 
                cvvError={cvvError} 
                monthError={monthError}  
                yearError={yearError} 
            ></PaymentForm> 
        </Col>
        <Col sm={4}>
            <Row>
                <Col sm={12}>
                    {(() => {
                        switch(template) {
                            case "buy_carrots":
                                return <Counter num={1} max={max_bet} update={(e)=>updateQty(e)}></Counter>
                            case "checkout":
                                return <PaymentCart {...props}></PaymentCart>
                            default:                                 
                        }
                    })()}                    
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="button_action_group">
                    <Button 
                        type="button"  
                        className="mybutton button_fullcolor shadow_convex"
                        onClick={()=>handleSubmit()}
                    >{translate({lang: lang, info: "submit"})}</Button>
                    <Button 
                        type="button"  
                        className="mybutton button_fullcolor shadow_convex"
                        onClick={()=>handleBack()}
                    >{translate({lang: lang, info: "back"})}</Button>                    
                </Col>
            </Row>
        </Col>
    </Row>
}
export default Payment