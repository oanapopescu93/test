import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import PolicyPrivacyEng from './policyPrivacyEng'
import PolicyPrivacyRo from './policyPrivacyRo'

function PolicyPrivacy(props){
    let dispatch = useDispatch()

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "policy_privacy"})}</h2>
        <div className="page_content">
            {(() => {
                switch (props.lang) {
                    case "RO":
                        return <PolicyPrivacyRo></PolicyPrivacyRo>
                    case "ENG":
                    default:
                        return <PolicyPrivacyEng></PolicyPrivacyEng>
                }
            })()}            
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent shadow_convex">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default PolicyPrivacy