import React from 'react'
import { translate } from '../../../translations/translate'
import Payment from '../../partials/payment/payment'

function Checkout(props){
    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "checkout"})}</h2>        
        <div className="page_content">
           <Payment {...props} template="checkout"></Payment>
        </div>
    </div>
}
export default Checkout