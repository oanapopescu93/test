import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import shop from '../../../../img/other/shop.png'
import Carousel from '../../../carousel/carousel'

function Market(props){
	let shader_style = {backgroundImage: `url(${shop})`}
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
                {/* <Carousel template="market" {...props}></Carousel>				 */}
            </Col>
            <Col sm={2}></Col>
        </Row>
    </div>
}
export default Market