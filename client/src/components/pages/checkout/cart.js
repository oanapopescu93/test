import React from 'react'
import carrot_img from '../../../img/icons/carrot_icon.png'
import { translate } from '../../../translations/translate'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import vegetables_yellow from '../../../img/icons/vegetables_yellow.png'

function Cart(props){
    const {lang, cart, home} = props
    let market = home.market ? home.market : []

    return <div className="cart_list">
        {cart.map(function(item, i){
            let product = market.filter(a => a.id === item.id)
            let cart_item_total_orice = item.qty * product[0].price
            return <div key={i} className='cart_item'>
                <div className="cart_image">
                    <div className="crop_vegetables">
                        <img alt="vegetable" className={'vegetable '+item.id} src={vegetables_yellow}></img>
                    </div>
                </div>
                <div className="cart_info">
                    {(() => {
                        switch(lang) {
                            case "RO":
                                return <h4>{product[0].name_ro}</h4>
                            case "ENG":
                            default: 
                                return <h4>{product[0].name_eng}</h4>
                        }
                    })()}
                    <h4><b>{translate({lang: lang, info: "total_price"})}</b>: {cart_item_total_orice}<img alt="carrot_img" className="currency_img" src={carrot_img}/></h4>
                </div>
            </div>
        })}
    </div>
}
export default Cart