import React, {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Modal} from "react-bootstrap"

import { changePopup } from "../../reducers/popup"
import { changeIsMinor } from "../../reducers/auth"
import { validateInput } from "../../utils/validate"
import { translate } from "../../translations/translate"

import Default from "./default"
import IsMinor from "./isMinor"
import ForgotPassword from "./forgotPassword"
import Settings from "./settings"
import ChangeProfilePic from "./changeProfilePic"
import ChangeUsername from "./changeUsername"
import ChangePassword from "./changePassword"
import KenoPrizeTable from "./kenoPrizeTable"
import GameResults from "./gameResults"

function Popup(props){
    const {lang, date, currency, socket, home} = props
    let open = useSelector(state => state.popup.open)
    let title = useSelector(state => state.popup.title)
    let template = useSelector(state => state.popup.template)
    let data = useSelector(state => state.popup.data)
    let size = useSelector(state => state.popup.size)
    let sticky = useSelector(state => state.popup.sticky)
    let dispatch = useDispatch()
    const [forgotPasswordResult, setForgotPasswordResult] = useState('')
    let currencies = home.currencies

  	function closeModal(){
        if(template !== "isMinor"){ //prevents modal from closing without making a choice
            dispatch(changePopup(false))
        }
	}

    function isMinorClick(e){
        dispatch(changePopup(false))
        dispatch(changeIsMinor(e))
    }

    function forgotPasswordClick(e){
        if(validateInput(e, "email")){
            socket.emit('forgotPassword_send', {lang: lang, email: e})   
        } else {
            setForgotPasswordResult(translate({lang: lang, info: "error"}))
        }
    }

    function dashboardChanges(x){
        socket.emit('dashboardChanges_send', x)
        closeModal()
    }

    socket.on('forgotPassword_read', function(res){
        setForgotPasswordResult(translate({lang: lang, info: res.send}))      
    })
   
    return <Modal id="myModal" className={"mymodal " + template} show={open} onHide={closeModal} size={size} centered>
            {title !== "" ? <Modal.Header>
                {!sticky ? <div className="closeButton closeButtonHeader" onClick={closeModal}>
                    <span>X</span>
                </div> : null}                
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header> : null}  
            <Modal.Body>
                {title === "" && !sticky ? <div className="closeButton" onClick={closeModal}>
                    <span>X</span>
                </div> : null}
                {(() => {					
                    switch (template) {                        
                        case "forgotPassword":
                            return <ForgotPassword 
                                lang={lang} 
                                text={data} 
                                forgotPasswordClick={(e)=>forgotPasswordClick(e)} 
                                forgotPasswordResult={forgotPasswordResult}
                            ></ForgotPassword>
                        case "isMinor":
                            return <IsMinor lang={lang} text={data} isMinorClick={(e)=>isMinorClick(e)}></IsMinor>
                        case "settings":
                            return <Settings lang={lang} date={date} currency={currency} currencies={currencies}></Settings>
                        case "change_pic":
                            return <ChangeProfilePic profiles={data} choosePic={(e)=>dashboardChanges(e)}></ChangeProfilePic>
                        case "change_username":
                            return <ChangeUsername changeUsername={(e)=>dashboardChanges(e)}></ChangeUsername>
                        case "change_password":
                            return <ChangePassword changePassword={(e)=>dashboardChanges(e)}></ChangePassword>
                        case "keno_prizes":
                            return <KenoPrizeTable lang={lang} kenoPrizes={data}></KenoPrizeTable>
                        case "game_results":
                            return <GameResults lang={lang} results={data}></GameResults>
                        case "error":
                        default:
                            if(typeof data === "string"){
                                return <Default lang={lang} text={data}></Default>
                            } else {
                                return null
                            }
                            
                    }
                })()}
            </Modal.Body>
        </Modal>
}
export default Popup