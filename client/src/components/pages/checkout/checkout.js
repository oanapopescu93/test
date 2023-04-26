import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import Form from './form'
import { changePopup } from '../../../reducers/popup'
import {orderAdd} from '../../../reducers/order'

function Checkout(props){
    let dispatch = useDispatch()

    function handleBack(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    function getOrder(x){
        let payload = {
            open: true,
            template: "order",
            title: translate({lang: props.lang, info: "order"}),
            data: translate({lang: props.lang, info: "order_message"}),
        }
        dispatch(changePopup(payload))
        dispatch(orderAdd(x))
    }

    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "checkout"})}</h2>        
        <div className="page_content">
            <Form {...props} getOrder={(e)=>getOrder(e)}></Form>
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent shadow_convex">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default Checkout