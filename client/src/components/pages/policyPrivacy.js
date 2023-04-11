import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'

function PolicyPrivacy(props){
    let dispatch = useDispatch()
    function handleBack(){
        dispatch(changePage('Salon'))
    }
    return <div className="page_container">
        <div className="content_wrap">
            <h2 className="title">{translate({lang: props.lang, info: "policy_privacy"})}</h2>
            <div className="page_content">

            </div>
            <div className="text_center">
                <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent">
                    {translate({lang: props.lang, info: "back"})}
                </Button>
            </div>
        </div>
    </div>
}
export default PolicyPrivacy