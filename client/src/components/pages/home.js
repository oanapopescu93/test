import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Footer from '../partials/footer'
import About from './about'
import Contact from './contact'
import Salon from '../salon/salon'
import Cookies from '../partials/cookies'
import { changeCookies } from '../../reducers/settings'
import { bringPayload } from '../../reducers/home'
import { translate } from '../../translations/translate'
import Loader from '../partials/loader'
import Questions from './questions'
import TermsConditions from './termsConditions'
import PolicyPrivacy from './policyPrivacy'

function Home(props) {
    let home = useSelector(state => state.home)
    let user = useSelector(state => state.auth.user)
    let page = useSelector(state => state.page.page)
    let cookies = useSelector(state => state.settings.cookies)
    let dispatch = useDispatch()
    
    function handleCookiesClick(){
        dispatch(changeCookies())
    }

    useEffect(() => {
		dispatch(bringPayload())	
	}, [])

    return <>
        {(() => {
            if(home){
                if(home.loaded){
                    return <div id="page-container">
                        <div className="content_wrap">   
                            {(() => {
                                switch (page) {
                                    case "About":
                                        return <About lang={props.lang}></About>
                                    case "Contact":
                                        return <Contact lang={props.lang}></Contact>                                        
                                    case "Questions":
                                        return <Questions lang={props.lang}></Questions>
                                    case "terms_cond":
                                        return <TermsConditions lang={props.lang}></TermsConditions>
                                    case "policy_privacy":
                                        return <PolicyPrivacy lang={props.lang}></PolicyPrivacy>         
                                    case "Salon":
                                    default:
                                        return <Salon {...props} user={user} home={home}></Salon>
                                }
                            })()}
                        </div>            
                        {cookies !== '1' ? <Cookies lang={props.lang} cookiesClick={()=>handleCookiesClick()}></Cookies> : null}
                        <Footer></Footer>
                    </div>
                } else {
                    return <Loader></Loader>
                }
            } else {
                return <p>{translate({lang: props.lang, info: "error"})}</p>
            }   
        })()}
    </>
}

export default Home