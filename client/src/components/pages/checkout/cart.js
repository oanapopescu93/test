import React from 'react'
import carrot_img from '../../../img/icons/carrot_icon.png'
import { translate } from '../../../translations/translate'
import vegetables_yellow from '../../../img/icons/vegetables_yellow.png'
import { Row, Col } from 'react-bootstrap'

function Cart(props){
    const {lang, list} = props
    return <div className="cart_list">
        <div className="cart_list_items">
            {list.map(function(item, i){
                let cart_item_total_price = item.qty * item.price
                return <div key={i} className='cart_item'>
                    <Row>
                        <Col xs={6} sm={4} className="cart_image">
                            <div className="crop_vegetables">
                                <img alt="vegetable" className={'vegetable '+item.id} src={vegetables_yellow}></img>
                            </div>
                        </Col>
                        <Col xs={6} sm={8} className="cart_info">
                            {(() => {
                                switch(lang) {
                                    case "RO":
                                        return <h4>{item.name_ro}</h4>
                                    case "ENG":
                                    default: 
                                        return <h4>{item.name_eng}</h4>
                                }
                            })()}
                            <h4><b>{translate({lang: lang, info: "total_price"})}</b>: {cart_item_total_price}<img alt="carrot_img" className="currency_img" src={carrot_img}/></h4>                                   
                        </Col>
                    </Row>
                </div>
            })}
        </div>
    </div>
}
export default Cart