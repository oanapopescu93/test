import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'
import PolicyPrivacy from '../pages/policyPrivacy'
import TermsConditions from '../pages/termsConditions'
import Language from '../partials/language'
import SignIn from './signIn'
import SignUp from './signUp'

function Sign(props) {
    let dispatch = useDispatch()
    let page = useSelector(state => state.page.page)
    const [visible, setVisible] = useState('signIn')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorUser, setErrorUser] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [signIn, setSignIn] = useState('active')
    const [signUp, setSignUp] = useState('')
    const [checkboxOne, setCheckboxOne] = useState(false)

    function handleClick(choice){
        setErrorEmail(false)
        setErrorUser(false)
        setErrorPass(false)
        setVisible(choice)    
        if(choice === "signIn"){
			setSignIn('active')
			setSignUp('')
		} else if(choice === "signUp"){
			setSignIn('')
			setSignUp('active')
		}
    }

    function signSubmit(data){
        setErrorEmail(false)
        setErrorUser(false)
        setErrorPass(false)
        if(!checkPayload(data.payload)){
            props.socket.emit(data.emit, data.payload)
        }
    }

    function checkPayload(data){        
        let error = false
        if(typeof data.email != "undefined" && (data.email === "")){
            error = true
            setErrorEmail(true)
        }
        if(typeof data.user != "undefined" && (data.user === "")){
            error = true
            setErrorUser(true)
        }
        if(typeof data.pass != "undefined" && (data.pass === "")){
            error = true
            setErrorPass(true)
        }
        return error
    }

    function handleForgotPassword(){
        //will do
    }

    function handleLink(link){
        dispatch(changePage(link))
    }

    function handleChangeCheck(x){
        if(page === "Salon"){
            switch(x){
                case "checkbox1":
                    setCheckboxOne(!checkboxOne)
                    break
            }
        }       
    } 

    return <>
        {(() => {
            switch (page) {
                case "terms_cond":
                    return <TermsConditions lang={props.lang}></TermsConditions>
                case "policy_privacy":
                    return <PolicyPrivacy lang={props.lang}></PolicyPrivacy>                
                case "Salon":
                default:
                    return <>
                        <Language title={props.lang}></Language>
                        <div className="sign_container">
                            <div className="deco">
                            <div className="sign_container_box">
                                <ul>
                                    <li id="signin_tab" className={signIn} onClick={()=>{handleClick('signIn')}}><span>{translate({lang: props.lang, info: "sign_in"})}</span></li>
                                    <li id="signup_tab" className={signUp} onClick={()=>{handleClick('signUp')}}><span>{translate({lang: props.lang, info: "sign_up"})}</span></li>
                                </ul>
                                {visible === "signIn" ? <SignIn signSubmit={(e)=>{signSubmit(e)}} lang={props.lang} socket={props.socket}></SignIn> : 
                                <SignUp signSubmit={(e)=>{signSubmit(e)}} lang={props.lang} socket={props.socket}></SignUp>}
                            </div>  
                            <div className="sign_extra_info">
                                {visible === "signIn" ? <p onClick={()=>handleForgotPassword()}>{translate({lang: props.lang, info: "signin_forgot_password"})}</p> : <>
                                <div className="checkbox_radio_container">
                                    <label>
                                        <input type="checkbox" name="checkbox1" checked={checkboxOne} onChange={()=>{handleChangeCheck("checkbox1")}}/>
                                        {(() => {
                                            switch (props.lang) {
                                                case "RO":
                                                    return <h6>Sunt de acord cu <span onClick={()=>handleLink("terms_cond")}>{translate({lang: props.lang, info: "terms_cond"})}</span> si <span onClick={()=>handleLink("policy_privacy")}>{translate({lang: props.lang, info: "policy_privacy"})}</span></h6>
                                                case "ENG":
                                                default:
                                                    return <h6>I agree to <span onClick={()=>handleLink("terms_cond")}>{translate({lang: props.lang, info: "terms_cond"})}</span> and <span onClick={()=>handleLink("policy_privacy")}>{translate({lang: props.lang, info: "policy_privacy"})}</span></h6>
                                            }
                                        })()}
                                    </label>
                                </div>
                                </>}
                            </div>
                            {(() => {
                                if(errorEmail || errorUser || errorPass){
                                    return <div className="alert alert-danger">
                                        {errorEmail ? <p className="text_red">errorEmail</p> : null}
                                        {errorUser ? <p className="text_red">errorUser</p> : null}
                                        {errorPass ? <p className="text_red">errorPass</p> : null}                        
                                    </div>
                                }
                            })()}
                            </div>
                        </div>   
                    </>
            }
        })()}
    </>
}

export default Sign