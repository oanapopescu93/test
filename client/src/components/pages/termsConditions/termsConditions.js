import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import TermsConditionsEng from './termsConditionsEng'
import TermsConditionsRo from './termsConditionsRo'
import Header from '../../partials/header'

function TermsConditions(props){
    let dispatch = useDispatch()
    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }
    return <div className="content_wrap">
        <Header template="terms_cond" title={translate({lang: props.lang, info: "terms_cond"})}></Header>     
        <div className="page_content">
            {(() => {
                switch (props.lang) {
                    case "RO":
                        return <TermsConditionsRo></TermsConditionsRo>
                    case "ENG":
                    default:
                        return <TermsConditionsEng></TermsConditionsEng>
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
export default TermsConditions