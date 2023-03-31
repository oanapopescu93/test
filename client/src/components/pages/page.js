import React from 'react'
import {useSelector} from 'react-redux'
import Language from '../partials/language'
import Footer from '../partials/footer'
import About from '../other_pages/about'
import Contact from '../other_pages/contact'
import Home from './home'
import Popup from '../popup/popup'
import Cookies from '../partials/cookies'
import { getCookie, isEmpty, setCookie } from '../../utils'

function Page(props) {
    let user = useSelector(state => state.auth.user)
    let page = useSelector(state => state.page.page)
    let website_cookies = getCookie('website_cookies')
    console.log(website_cookies, isEmpty(website_cookies))
    function handleCookiesClick(){
        setCookie('website_cookies', true)
    }
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
                    return <Home {...props} user={user}></Home>
            }
        })()}
        <Popup lang={props.lang}></Popup>
        {isEmpty(website_cookies) ? <Cookies lang={props.lang} cookiesClick={()=>handleCookiesClick()}></Cookies> : null}
        <Footer></Footer>
    </>
}

export default Page