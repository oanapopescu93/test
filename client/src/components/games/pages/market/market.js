import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import shop from '../../../../img/other/shop.png'
import Carousel from '../../../carousel/carousel'
import { useDispatch } from 'react-redux'
import { cartAdd } from '../../../../reducers/cart'

function Market(props){
    const {lang, socket, home} = props
    let market = home.market ? home.market : []
	let shader_style = {backgroundImage: `url(${shop})`}
    let market_carousel_options = {
        items: 4,
        nav: false,
        rewind: true,
        autoplay: false,
        slideBy: 1,
        dots: false,
        loop:true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:3
            },
            1200:{
                items:4
            },
        }
    }
    let dispatch = useDispatch()
    
    function marketChoice(x){
        dispatch(cartAdd(x))
    }

    return <div className="market_container">
        <Row>
            <Col sm={12}><h2>Market</h2></Col>
        </Row>
        <Row>
            <Col sm={2}></Col>
            <Col sm={8}><div style={shader_style} className="shop_shader"></div></Col>
            <Col sm={2}></Col>
        </Row>
        <Row className="item_container">
            <Col sm={2}></Col>
            <Col sm={8} style={{textAlign:"center"}}>
                <Carousel 
                    id="carousel_market"
                    template="market" 
                    options={market_carousel_options} 
                    lang={lang} 
                    itemList={market} 
                    getItem={(e)=>marketChoice(e)}
                ></Carousel>
            </Col>
            <Col sm={2}></Col>
        </Row>
    </div>
}
export default Market