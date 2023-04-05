import React, {useState} from 'react'
import { translate } from '../../translations/translate'
import Language from '../partials/language'
import SignIn from './signIn'
import SignUp from './signUp'

function Sign(props) {
    const [visible, setVisible] = useState('signIn')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorUser, setErrorUser] = useState(false)
    const [errorPass, setErrorPass] = useState(false)

    function handleClick(choice){
        setVisible(choice)     
    }

    function signSubmit(data){
        console.log(data)
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

    return <>
        <Language></Language>
        <div className="sign_container">
            <div className="sign_container_box">
                <ul>
                    <li id="signin_tab" onClick={()=>{handleClick('signIn')}}><span>{translate({lang: props.lang, info: "sign_in"})}</span></li>
                    <li id="signup_tab" onClick={()=>{handleClick('signUp')}}><span>{translate({lang: props.lang, info: "sign_up"})}</span></li>
                </ul>
                {visible === "signIn" ? <SignIn signSubmit={(e)=>{signSubmit(e)}} lang={props.lang} socket={props.socket}></SignIn> : 
                <SignUp signSubmit={(e)=>{signSubmit(e)}} lang={props.lang} socket={props.socket}></SignUp>}
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
    </>
}

export default Sign