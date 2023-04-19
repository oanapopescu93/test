import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'
import under_construction_icon from '../../img/icons//under_construction_icon.png'

function PolicyPrivacy(props){
    let dispatch = useDispatch()
    function handleBack(){
        dispatch(changePage('Salon'))
    }
    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "policy_privacy"})}</h2>
        <div className="page_content">
            <img className="under_construction_icon" alt="under construction" src={under_construction_icon} />
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent shadow_convex">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default PolicyPrivacy