import React from 'react'
import { translate } from '../../translations/translate'
import { setCookie } from '../../utils'
import Products from '../partials/products'
import Sapou from '../partials/sapou'

function HomePage(props) {
    const {lang, home} = props  
    function handleExit(){
        setCookie('website_uuid', '')
        window.location.reload(false)
    }
    return <div className="page_container">
        <Sapou lang={props.lang}></Sapou>
        <Products lang={lang} products={home.products}></Products>
        <button type="button" onClick={()=>handleExit()} className="mybutton button_transparent">{translate({lang: lang, info: "exit"})}</button>
    </div>
}

export default HomePage