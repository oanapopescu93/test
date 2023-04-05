import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Modal} from "react-bootstrap"
import { changePopup } from "../../reducers/popup"
import DefaultPopup from "./defaultPopup"
import { translate } from '../../translations/translate'

function Popup(props){
    let open = useSelector(state => state.popup.open)
    let title = useSelector(state => state.popup.title)
    let template = useSelector(state => state.popup.template)
    let data = useSelector(state => state.popup.data)
    let size = useSelector(state => state.popup.size)
    let dispatch = useDispatch()

  	function closeModal(){
		dispatch(changePopup(false))
	}
   
    return <Modal id="myModal" className="mymodal text-center" show={open} onHide={closeModal} size={size}>
            {title !== "" ? <Modal.Header>
                <div className="closeButton closeButtonHeader" onClick={closeModal}>
                    <span>X</span>
                </div>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header> : null}  
            <Modal.Body>
                {title === "" ? <div className="closeButton" onClick={closeModal}>
                    <span>X</span>
                </div> : null}
                {(() => {					
                    switch (template) {
                        case "error":
                            return <DefaultPopup lang={props.lang} text={data}></DefaultPopup>
                        default:
                            return <p>{translate({lang: props.lang, info: "error"})}</p>
                    }
                })()}
            </Modal.Body>
        </Modal>
}
export default Popup