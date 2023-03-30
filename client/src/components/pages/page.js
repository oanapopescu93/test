import React from 'react'
import {useSelector} from 'react-redux'
import Products from './products'
import Language from './language'
import Sapou from '../partials/sapou'
import Footer from '../partials/footer'
import About from '../other_pages/about'
import Contact from '../other_pages/contact'

function Page(props) {
    let page = useSelector(state => state.page.page)

    return <>
        <Language></Language>
        {(() => {
            switch (page) {
                case "About":
                    return <About lang={props.lang} socket={props.socket}></About>
                case "Contact":
                    return <Contact lang={props.lang} socket={props.socket}></Contact>
                case "Home":
                default:
                    return <>
                        <Sapou lang={props.lang}></Sapou>        
                        <Products products={props.home.products}></Products>
                    </>
            }
        })()}        
        <Footer></Footer>
    </>
}

export default Page