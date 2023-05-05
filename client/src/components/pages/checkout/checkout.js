import React from 'react'
import {useDispatch} from 'react-redux'
import { translate } from '../../../translations/translate'
import Form from './form'
import { changePopup } from '../../../reducers/popup'
import {orderAdd} from '../../../reducers/order'

function Checkout(props){
    let dispatch = useDispatch()

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
    </div>
}
export default Checkout