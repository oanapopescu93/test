import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { translate } from '../../../translations/translate'
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { checkoutData, isEmpty, postData } from '../../../utils/utils';
import { validateInput, validateCard, validateCVV } from '../../../utils/validate'

function PaymentForm(props){
    const {lang, firstnameError, lastnameError, phoneError, emailError, addressError, countryError, cityError,  postalZipCodeError, cardNumberError, cvvError, monthError, yearError} = props 

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

    function changeCountry(x){
        setCountry(x)
        setCityList(countries_json[x])
        if(typeof props.getChanges === "function"){
            props.getChanges({type: 'country', value: x})
        }
    }
    function changeCity(x){
        setCity(x)
        if(typeof props.getChanges === "function"){
            props.getChanges({type: 'city', value: x})
        }
    }
    function changeMonth(x){
        setMonth(x)
        if(typeof props.getChanges === "function"){
            props.getChanges({type: 'month', value: x})
        }
    }
    function changeYear(x){
        setYear(x)
        if(typeof props.getChanges === "function"){
            props.getChanges({type: 'year', value: x})
        }
    }
    function handleChangeCheck(x){
        switch(x){            
            case "radio2":	
                setRadioOne(false)			
                setRadioTwo(true)
                if(typeof props.getChanges === "function"){
                    props.getChanges({type: 'gateway', value: 'paypal'})
                }
                break
            case "radio1":	
            default:
                setRadioOne(true)			
                setRadioTwo(false)
                if(typeof props.getChanges === "function"){
                    props.getChanges({type: 'gateway', value: 'stripe'})
                }
                break
        }  
    }

    return <form id="payment_form">
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
}
export default PaymentForm