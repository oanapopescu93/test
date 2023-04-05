import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import Cell from './cell';

function Carousel(props) {
    let id = props.id
    let items = props.items ? props.items : []
    let options = props.options ? props.options : {
        loop: true,
        center: true,
        items: 3,
        margin: 10,
        autoplay: false,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
        }
    }

	return <OwlCarousel id="mycarousel" className='owl-theme' {...options}>
        {items.map(function(item, i){
            return <Cell lang={props.lang} index={i} data={item} template={"products"}></Cell>
        })}
    </OwlCarousel>
}

export default Carousel