import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../reducers/page'
import { translate } from '../../translations/translate'

function QuestionList(props){
    const {list} = props
    const [index, setIndex] = useState(0)

    function handleDropdown(i){
        setIndex(i)
    }

    return <div className="question_container">
        {list.map(function(item, i){
            let question = item.question
            let answer = item.answer
            return <div key={i} className="question_box">
                <div className="question_container">
                    <div className="question_title shadow_convex" onClick={()=>handleDropdown(i)}>{question}</div>
                </div>
                {(() => {
                    let open = ""
                    if(i === index){
                        open = "open"
                    }
                    return <div box={i} className={"answer_container " + open}>{answer}</div>
                })()}
            </div>
        })}
    </div>
}

function Questions(props){
    let dispatch = useDispatch()

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "questions"})}</h2>
        <div className="page_content">
            {(() => {
                if(props.list && props.list.length>0){
                    return <QuestionList lang={props.lang} list={props.list}></QuestionList>
                } else {
                    return <p>{translate({lang: props.lang, info: "under_construction"})}</p>
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
export default Questions