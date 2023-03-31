import React from 'react'
import { translate } from '../../translations/translate'

function Cookies(props) {
	return (
		<div className="cookies_msg_container" id ="cookies_msg">
            <div className="cookies_msg">
                <div className="cookies_text">                    
                    <h4>{translate({lang: props.lang, info: "cookies_modal_title"})}</h4>
                    <h6>{translate({lang: props.lang, info: "cookies_modal_text"})}</h6>
                </div>							
                <div className="confirm_cookies">
                    <button type="button" id="cookies_btn_ok" onClick={()=>props.cookiesClick()}>OK</button>
                </div>
            </div>
        </div>
	)
}

export default Cookies