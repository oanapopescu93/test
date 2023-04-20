import React, {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Modal} from "react-bootstrap"
import { changePopup } from "../../reducers/popup"
import DefaultPopup from "./defaultPopup"
import IsMinorPopup from "./isMinorPopup"
import { changeIsMinor } from "../../reducers/auth"
import ForgotPasswordPopup from "./forgotPasswordPopup"
import { validateInput } from "../../utils/validate"
import { translate } from "../../translations/translate"

function Popup(props){
    const {lang, socket} = props
    let open = useSelector(state => state.popup.open)
    let title = useSelector(state => state.popup.title)
    let template = useSelector(state => state.popup.template)
    let data = useSelector(state => state.popup.data)
    let size = useSelector(state => state.popup.size)
    let sticky = useSelector(state => state.popup.sticky)
    let dispatch = useDispatch()
    const [forgotPasswordResult, setForgotPasswordResult] = useState('')

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
                            return <ForgotPasswordPopup 
                                lang={lang} 
                                text={data} 
                                forgotPasswordClick={(e)=>forgotPasswordClick(e)} 
                                forgotPasswordResult={forgotPasswordResult}
                            ></ForgotPasswordPopup>
                        case "isMinor":
                            return <IsMinorPopup lang={lang} text={data} isMinorClick={(e)=>isMinorClick(e)}></IsMinorPopup>
                        case "error":
                        default:
                            return <DefaultPopup lang={lang} text={data}></DefaultPopup>
                    }
                })()}
            </Modal.Body>
        </Modal>
}
export default Popup