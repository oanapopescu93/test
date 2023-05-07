import React from 'react'
import { translate } from '../../translations/translate'
import Payment from '../partials/payment/payment'

function BuyCarrots(props){
    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "buy_carrots"})}</h2>
        <div className="page_content">
            <Payment {...props} template="buy_carrots"></Payment>  
        </div>
    </div>
}
export default BuyCarrots