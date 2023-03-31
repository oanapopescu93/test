import React, {useState} from 'react'
import { translate } from '../../translations/translate'
import SignIn from './signIn'
import SignUp from './signUp'

function Sign(props) {
    const [visible, setVisible] = useState('signIn')

    function handleClick(choice){
        setVisible(choice)     
    }

    return <div className="sign_container">
        <ul>
            <li id="signin_tab" onClick={()=>{handleClick('signIn')}}><span>{translate({lang: props.lang, info: "sign_in"})}</span></li>
            <li id="signup_tab" onClick={()=>{handleClick('signUp')}}><span>{translate({lang: props.lang, info: "sign_up"})}</span></li>
        </ul>
        {visible === "signIn" ? <SignIn lang={props.lang} socket={props.socket}></SignIn> : <SignUp lang={props.lang} socket={props.socket}></SignUp>}
    </div>
}

export default Sign