import React, {useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changePopup } from "../../reducers/popup"

import DefaultPopup from "./defaultPopup"

function Popup(props){
    let popup = useSelector(state => state.popup)
    let open = popup.open ? 'show' : ''
    let title = popup.title ? popup.title : ""
    let template = popup.template ? popup.template : ""
    let data = popup.data ? popup.data : null
    let size = popup.size ? popup.size : "sm"  
    let line = title !== "" ? "line" : ""  
    let dispatch = useDispatch()

    useEffect(() => {
		open = popup.open ? 'show' : ''
        title = popup.title ? popup.title : ""
        template = popup.template ? popup.template : ""
        data = popup.data ? popup.data : null
        size = popup.size ? popup.size : "sm"
        line = title !== "" ? "line" : ""
	}, [popup])    

  	function handleClose(e){
        e.stopPropagation()
        if(e.target.id === "custom_popup" || e.target.id === "popup_close"){
            dispatch(changePopup({open: false}))
        }
	}
   
    return <>
        {popup.open ? <div id="custom_popup" className={"popup_container " + open} onClick={(e)=>handleClose(e)}>
        <div className="popup">
            <div className={"popup_header " + line}>
                <h2>{title}</h2>
                <div className="close" onClick={(e)=>handleClose(e)}>
                    <span id="popup_close">x</span>
                </div>
            </div>
            {(() => {
            switch (template) {
                default:
                    return <DefaultPopup lang={props.lang} text={data}></DefaultPopup>
            }
        })()}
        </div>
    </div> : null}
    </>
}
export default Popup