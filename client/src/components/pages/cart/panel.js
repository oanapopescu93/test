import React from 'react'
import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { translate } from '../../../translations/translate'
import carrot_img from '../../../img/icons/carrot_icon.png'

function Panel(props){
    const {list, lang, promo} = props
    console.log('promo--> ', promo)
    let total = totalPriceSum()
    let total_promo = total

    function totalPriceSum(){
        let total = 0
        for(let i in list){
            total = total + list[i].price * list[i].qty
        }
        return total
    }

    function removeAll(){
        if(typeof props.removeAll === "function"){
            props.removeAll()
        }
    }

    function handleCheckout(){
        if(typeof props.handleCheckout === "function"){
            props.handleCheckout()
        }
    }

    function handleBack(){
        if(typeof props.handleBack === "function"){
            props.handleBack()
        }
    }

    return <div id="cart_panel" className="cart_box shadow_concav">
        <div className="cart_total_price">
            <p><b>{translate({lang: lang, info: "price"})}</b>: {total}<img alt="carrot_img" className="currency_img" src={carrot_img}/></p>            
            <p><b>Promo: </b>{promo && Object.keys(promo).length>0 ? <span>{promo.discount}</span> : <span>-</span>}</p>
            <h3><b>{translate({lang: lang, info: "total_price"})}</b>: {total_promo}<img alt="carrot_img" className="currency_img" src={carrot_img}/></h3>
        </div>
        <div className="button_action_group">
            <Button 
                type="button"  
                className="mybutton button_transparent shadow_convex remove"
                onClick={()=>handleCheckout()}
            ><FontAwesomeIcon icon={faTrashCan}/><span>{translate({lang: lang, info: "checkout"})}</span></Button>
            <Button 
                type="button"  
                className="mybutton button_transparent shadow_convex remove"
                onClick={()=>removeAll()}
            ><FontAwesomeIcon icon={faTrashCan}/><span>{translate({lang: lang, info: "remove_all"})}</span></Button>
            <Button 
                type="button"  
                className="mybutton button_transparent shadow_convex remove"
                onClick={()=>handleBack()}
            ><FontAwesomeIcon icon={faCartShopping}/><span>{translate({lang: lang, info: "continue_shopping"})}</span></Button>
        </div>
    </div>
}
export default Panel