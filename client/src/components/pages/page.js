import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Footer from '../partials/footer'
import About from '../other_pages/about'
import Contact from '../other_pages/contact'
import Home from './home'
import Popup from '../popup/popup'
import Cookies from '../partials/cookies'
import { changeCookies } from '../../reducers/settings'
import { getCookie, isEmpty } from '../../utils'
import Sign from '../sign/sign'

function Page(props) {
    let user = useSelector(state => state.auth.user)
    let page = useSelector(state => state.page.page)
    let cookies = useSelector(state => state.settings.cookies)
    let dispatch = useDispatch()
    let uuid = getCookie("website_uuid")
    
    function handleCookiesClick(){
        dispatch(changeCookies())
    }

    return <>
        {isEmpty(uuid) ? <Sign lang={props.lang} socket={props.socket}></Sign> : <div id="page-container">
            <div id="content-wrap">        
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
            </div>            
            {cookies !== '1' ? <Cookies lang={props.lang} cookiesClick={()=>handleCookiesClick()}></Cookies> : null}
            <Footer></Footer>
        </div>}
        <Popup lang={props.lang}></Popup>
    </>
}

export default Page