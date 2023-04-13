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
import Career from './career'

function Home(props) {
    let home = useSelector(state => state.home)
    let user = useSelector(state => state.auth.user)
    let page = useSelector(state => state.page.page)
    let game = useSelector(state => state.page.game)
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
                        {(() => {
                            switch (page) {
                                case "About":
                                    return <About {...props}></About>
                                case "terms_cond":
                                    return <TermsConditions {...props}></TermsConditions>
                                case "policy_privacy":
                                    return <PolicyPrivacy {...props}></PolicyPrivacy>         
                                case "Career":
                                    return <Career {...props} list={home.career}></Career>           
                                case "Questions":
                                    return <Questions {...props}></Questions>
                                case "Contact":
                                    return <Contact {...props}></Contact>         
                                case "Salon":
                                default:
                                    return <Salon {...props} user={user} home={home} game={game}></Salon>
                            }
                        })()}        
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