import React from 'react'
import Products from '../partials/products'
import Sapou from '../partials/sapou'

function HomePage(props) {
    const {lang, home} = props  
    return <div className="page_container">
        <Sapou lang={props.lang}></Sapou>
        <Products lang={lang} products={home.products}></Products>
    </div>
}

export default HomePage