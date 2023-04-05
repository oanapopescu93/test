import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { setCookie } from '../../utils'
import Carousel from '../carousel/carousel'
import Sapou from '../partials/sapou'

function Home(props) {
    const {lang, home} = props  
    function handleExit(){
        setCookie('website_uuid', '')
        window.location.reload(false)
    }
    return <div className="page_container">
        <Sapou lang={lang}></Sapou>
        <Carousel lang={lang} items={home.products}></Carousel>
        <div className="page_exit">
            <Button id="exit" type="button" onClick={()=>handleExit()} className="mybutton button_transparent">{translate({lang: lang, info: "exit"})}</Button>
        </div>
    </div>
}

export default Home