import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import { translate } from '../../translations/translate';
import Cell from './cell';

function Carousel(props) {
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
        {(() => {
            if(items.length>0){
                return <>
                    {items.map(function(item, i){
                        return <Cell lang={props.lang} index={i} data={item} template={props.template}></Cell>
                    })}
                </>
            } else {
                return <p>{translate({lang: props.lang, info: "error"})}</p>
            }
        })()}
    </OwlCarousel>
}

export default Carousel