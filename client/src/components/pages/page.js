import React from 'react'
import {useSelector} from 'react-redux'
import Products from '../partials/products'
import Language from '../partials/language'
import Sapou from '../partials/sapou'
import Footer from '../partials/footer'
import About from '../other_pages/about'
import Chat from '../other_pages/chat'
import Contact from '../other_pages/contact'
import Home from './home'

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
                    return <Home {...props}></Home>
            }
        })()}
    </>
}

export default Page