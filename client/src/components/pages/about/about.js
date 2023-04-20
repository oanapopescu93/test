import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import AboutEng from './aboutEng'
import AboutRo from './aboutRo'

function About(props){
    let dispatch = useDispatch()
    function handleBack(){
        dispatch(changePage('Salon'))
    }
    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "about"})}</h2>
        <div className="page_content">
            {(() => {
                switch (props.lang) {
                    case "RO":
                        return <AboutRo></AboutRo>
                    case "ENG":
                    default:
                        return <AboutEng></AboutEng>
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
export default About