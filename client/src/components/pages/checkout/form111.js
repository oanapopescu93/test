import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { translate } from '../../../translations/translate'
import { checkoutData, isEmpty, postData } from '../../../utils/utils';
import { validateInput, validateCard, validateCVV } from '../../../utils/validate'
import { changePopup } from '../../../reducers/popup';
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import $ from "jquery"
import Cart from './cart';
import carrot_img from '../../../img/icons/carrot_icon.png'

function Form(props){
    const {lang, socket, home} = props   
    let market = home.market ? home.market : []
    let dispatch = useDispatch()
	let cart = useSelector(state => state.cart.cart) 
    let promo = useSelector(state => state.cart.promo) 
    let list = getProducts(cart) 
    let total = totalPriceSum()
    let total_promo = total
    if(promo && Object.keys(promo).length>0){
        total_promo = (total_promo - (total_promo * promo.discount)/100).toFixed(2)
    }
    // total_promo = 123 //for testing
    
    const [country, setCountry] = useState("")    
    const [month, setMonth] = useState(-1)    
    const [year, setYear] = useState("") 
    const [city, setCity] = useState("")    
    const [cityList, setCityList] = useState([]) 
     
    const [radioOne, setRadioOne] = useState(true) 
    const [radioTwo, setRadioTwo] = useState(false)

    const countries_json = checkoutData().countries
    const countries = checkoutData().countries_list
    const monthOptions = checkoutData().monthOptions
    const yearOptions = checkoutData().yearOptions
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    const [firstnameError, setFirstnameError] = useState(false)
    const [lastnameError, setLastnameError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const [countryError, setCountryError] = useState(false)   
    const [cityError, setCityError] = useState(false)   
    const [postalZipCodeError, setPostalZipCodeError] = useState(false)
    const [cardNumberError, setCardNumberError] = useState(false)
    const [cvvError, setCvvError] = useState(false)
    const [monthError, setMonthError] = useState(false)   
    const [yearError, setYearError] = useState(false)  

    const [gateway, setGateway] = useState("stripe") 

    function getProducts(cart){
        let array = []
        for(let i in cart){
            let index = market.findIndex((x) => x.id === cart[i].id)
            if(index !== -1){
                let elem = {...market[index], qty: cart[i].qty, cardId: cart[i].cartId}
                array.push(elem)
            }            
        }
        return array
    }    
    function totalPriceSum(){
        let total = 0
        for(let i in cart){
            let product = market.filter(a => a.id === cart[i].id)
            total = total + product[0].price * cart[i].qty
        }
        return total.toFixed(2)
    }

    function changeCountry(x){
        setCountry(x)
        setCityList(countries_json[x])
    }
    function changeCity(x){
        setCity(x)
    }
    function changeMonth(x){
        setMonth(x)
    }
    function changeYear(x){
        setYear(x)
    }
    function handleChangeCheck(x){
        switch(x){            
            case "radio2":	
                setRadioOne(false)			
                setRadioTwo(true)
                setGateway('paypal')
                break
            case "radio1":	
            default:
                setRadioOne(true)			
                setRadioTwo(false)
                setGateway('stripe')
                break
        }  
    }

    function refreshErrors(){
        setFirstnameError(false)
        setLastnameError(false)
        setPhoneError(false)
        setEmailError(false)
        setAddressError(false)
        setCountryError(false)
        setCityError(false)
        setPostalZipCodeError(false)
        setCardNumberError(false)
        setCvvError(false)
        setMonthError(false)
        setYearError(false)
    } 

    function handleSubmit(){
        refreshErrors()  
        let form = $('#payment_form').serializeArray()
        let payload = {
            firstname: getValueFromForm(form, 'firstname'),
            lastname: getValueFromForm(form, 'lastname'),
            phone: getValueFromForm(form, 'phone'),
            email: getValueFromForm(form, 'email'),
            address: getValueFromForm(form, 'address'),
            postalZipCode: getValueFromForm(form, 'postal_zip_code'),
            country: country,
            city: city,            
            cardNumber: getValueFromForm(form, 'card_number'),
            cvv: getValueFromForm(form, 'cvv'),
            expiry_month: month,
            expiry_year: year,
        }       
        validate(payload)
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
        if(isEmpty(data.firstname)){
            setFirstnameError(true)
            problem = true
        }
        if(isEmpty(data.lastname)){
            setLastnameError(true)
            problem = true
        }
        if(isEmpty(data.phone)){
            setPhoneError(true)
            problem = true
        }
        if(isEmpty(data.email) || !validateInput(data.email, "email")){
            setEmailError(true)
            problem = true
        }        
        if(isEmpty(data.address)){
            setAddressError(true)
            problem = true
        }    
        if(isEmpty(data.country)){
            setCountryError(true)
            problem = true
        }
        if(isEmpty(data.city)){
            setCityError(true)
            problem = true
        } 
        if(isEmpty(data.postal_zip_code)){
            setPostalZipCodeError(true)
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

        sendPayload(data)//for fast tests (the errors will appear but the pay will be sent)
        // if(!problem){
        //     let payload = data
        //     sendPayload(payload)
        // }
    }
    function sendPayload(payload){   
        if(total_promo > 0){ // somthing is wrong and we can't charge client (ex: somehow the cart is empty, so, the total amount is 0)
            if(gateway === "stripe"){
                socket.emit('payment_stripe_send', {gateway, payload, amount: total_promo, list})
            } if(gateway === "paypal"){
                postData("/api/paypal", payload).then((data) => {
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
                title: translate({lang: props.lang, info: "error"}),
                data: translate({lang: props.lang, info: "error_charge"})
            }
            dispatch(changePopup(payload))
        }
    }

    useEffect(() => {
        socket.on('payment_stripe_read', function(res){
            if(res && typeof props.getOrder === "function"){
                props.getOrder(res)
            }
        })
    }, [socket])

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    return <Row>
        <Col sm={8}>                
            <form id="payment_form">
                <Row>
                    <Col sm={12}>
                        <h3>{translate({lang: props.lang, info: "customer_info"})}</h3>  
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="firstname">{translate({lang: props.lang, info: "firstname"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder={translate({lang: props.lang, info: "firstname"})} id="firstname" name="firstname"/>
                        {firstnameError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="lastname">{translate({lang: props.lang, info: "lastname"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder={translate({lang: props.lang, info: "lastname"})} id="lastname" name="lastname"/>
                        {lastnameError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="phone">{translate({lang: props.lang, info: "phone"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder="+40712312312" id="phone" name="phone"/>
                        {phoneError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="email">{translate({lang: props.lang, info: "email"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder="text@text.text" id="email" name="email"/>
                        {emailError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="address">{translate({lang: props.lang, info: "address"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder={translate({lang: props.lang, info: "address"})} id="address" name="address"/>
                        {addressError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label>{translate({lang: props.lang, info: "country"})}</label>
                        <DropdownButton title={country} onSelect={(e)=>changeCountry(e)} className="shadow_concav">
                            {countries.map(function(x, i){
                                return <Dropdown.Item key={i} eventKey={x}>{x}</Dropdown.Item>
                            })}
                        </DropdownButton>
                        {countryError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label>{translate({lang: props.lang, info: "town_city"})}</label>
                        <DropdownButton title={city} onSelect={(e)=>changeCity(e, false)} className="shadow_concav">
                            {cityList.map(function(x, i){
                                return <Dropdown.Item key={i} eventKey={x}>{x}</Dropdown.Item>
                            })}
                        </DropdownButton>                        
                        {cityError ? <div className="alert alert-danger">
                            <p className="text_red">
                                {translate({lang: props.lang, info: "fill_field"})}
                            </p>                            
                        </div> : null}
                    </Col>
                    <Col sm={6} md={6} lg={3}>
                        <label htmlFor="postal_zip_code">{translate({lang: props.lang, info: "postal_zip_code"})}</label>
                        <input className="input_light shadow_concav" type="text" placeholder="00000" id="postal_zip_code" name="postal_zip_code"/>
                        {postalZipCodeError ? <div className="alert alert-danger">
                            <p className="text_red">{translate({lang: props.lang, info: "fill_field"})}</p>
                        </div> : null}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h3>{translate({lang: props.lang, info: "payment_info"})}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col sm={12}>
                            <div className="checkbox_radio_container">
                                    <label>
                                        <input type="radio" name="radio1" checked={radioOne} onChange={()=>{handleChangeCheck("radio1")}}/>
                                        {translate({lang: props.lang, info: "pay_card"})}
                                    </label>
                                    <label>
                                        <input type="radio" name="radio2" checked={radioTwo} onChange={()=>{handleChangeCheck("radio2")}}/>
                                        {translate({lang: props.lang, info: "pay_paypal"})}
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        {radioOne ? <>
                            <Row>
                                <Col sm={12}>
                                    <label htmlFor="card_number">{translate({lang: props.lang, info: "card_number"})}</label>
                                    <input className="input_light shadow_concav" type="text" placeholder="XXXX XXXX XXXX XXXX" id="card_number" name="card_number"/>
                                    {cardNumberError ? <div className="alert alert-danger">
                                        <p className="text_red">
                                            {translate({lang: props.lang, info: "fill_field"})}
                                        </p>                            
                                    </div> : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <label>{translate({lang: props.lang, info: "month"})}</label>
                                    <DropdownButton title={monthOptions[month] ? monthOptions[month][lang] : translate({lang: props.lang, info: "month"})} onSelect={(e)=>changeMonth(e)} className="shadow_concav">
                                        {months.map(function(x, i){
                                            return <Dropdown.Item key={i} eventKey={x}>{monthOptions[x][lang]}</Dropdown.Item>
                                        })}
                                    </DropdownButton>                                    
                                    {monthError ? <div className="alert alert-danger">
                                        <p className="text_red">
                                            {translate({lang: props.lang, info: "fill_field"})}
                                        </p>                            
                                    </div> : null}
                                </Col>
                                <Col sm={4}>
                                    <label>{translate({lang: props.lang, info: "year"})}</label>
                                    <DropdownButton title={year ? year : translate({lang: props.lang, info: "year"})} onSelect={(e)=>changeYear(e)} className="shadow_concav">
                                        {yearOptions.map(function(x, i){
                                            return <Dropdown.Item key={i} eventKey={x}>{x}</Dropdown.Item>
                                        })}
                                    </DropdownButton>
                                    {yearError ? <div className="alert alert-danger">
                                        <p className="text_red">
                                            {translate({lang: props.lang, info: "fill_field"})}
                                        </p>                            
                                    </div> : null}
                                </Col>
                                <Col sm={4}>
                                    <label htmlFor="cvv">{translate({lang: props.lang, info: "cvv"})}</label>
                                    <input className="input_light shadow_concav" type="text" placeholder="123" id="cvv" name="cvv"/>
                                    {cvvError ? <div className="alert alert-danger">
                                        <p className="text_red">
                                            {translate({lang: props.lang, info: "fill_field"})}
                                        </p>                            
                                    </div> : null}
                                </Col>
                            </Row>
                        </> : null}                            
                    </Col>
                </Row>                              
            </form>
        </Col>        
        <Col sm={4}>
            {cart && cart.length>0 ? <>
                <Row>
                    <Col sm={12}>
                        <h3 className="cart_header">{translate({lang: props.lang, info: "cart"})}</h3>  
                    </Col>
                    <Col sm={12}>                        
                        <Cart {...props} list={list}></Cart>
                    </Col>                    
                </Row>   
            </> : null}   
            <Row>
                <Col sm={12}>
                    <div className="cart_total_price">
                        {promo && Object.keys(promo).length>0 ? <>
                            <p><b>{translate({lang: lang, info: "price"})}</b>: {total}<img alt="carrot_img" className="currency_img" src={carrot_img}/></p>            
                            <p><b>{translate({lang: lang, info: "promo_discount"})}: </b><span>-{promo.discount}%</span></p>
                            <h3><b>{translate({lang: lang, info: "total_price"})}</b>: {total_promo}<img alt="carrot_img" className="currency_img" src={carrot_img}/></h3>
                        </> : <h3><b>{translate({lang: lang, info: "total_price"})}</b>: {total}<img alt="carrot_img" className="currency_img" src={carrot_img}/></h3>}
                    </div>
                </Col>
            </Row>          
            <Row>
                <Col sm={12} className="button_action_group">
                    <Button 
                        type="button"  
                        className="mybutton button_fullcolor shadow_convex"
                        onClick={()=>handleSubmit()}
                    >{translate({lang: props.lang, info: "submit"})}</Button>
                    <Button 
                        type="button"  
                        className="mybutton button_fullcolor shadow_convex"
                        onClick={()=>handleBack()}
                    >{translate({lang: props.lang, info: "back"})}</Button>                    
                </Col>
            </Row>
        </Col>
    </Row> 
}
export default Form