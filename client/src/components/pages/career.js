import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'

function Career(props){
    const {lang, list} = props
    console.log(list)
    let dispatch = useDispatch()
    function handleBack(){
        dispatch(changePage('Salon'))
    }
    return <div className="content_wrap">
        <h2 className="title">{translate({lang: lang, info: "career"})}</h2>
        <div className="page_content">
            {(() => {
                if(list){
                    if(list.length>0){                        
                        return <div>
                            {/* will do */}
                        </div>
                    } else {
                        return <p className="text_center">{translate({lang: lang, info: "no_career"})}</p>
                    }
                } else {
                    return <p className="text_center">{translate({lang: lang, info: "error"})}</p>
                }
            })()}    
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent">
                {translate({lang: lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default Career