import React, {useEffect, useState} from 'react'
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
import { ReactComponent as Bitcoin } from '../../img/icons/bitcoin-love-heart.svg'
import { changePage } from '../../reducers/page'
import Donation from './donation'
import Language from '../partials/language'

function Home(props) {
    let home = useSelector(state => state.home)
    let user = useSelector(state => state.auth.user)
    let page = useSelector(state => state.page)
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
                        <Language title={props.lang}></Language>
                        {(() => {
                            switch (page.page) {
                                case "About":
                                    return <About {...props}></About>
                                case "terms_cond":
                                    return <TermsConditions {...props}></TermsConditions>
                                case "policy_privacy":
                                    return <PolicyPrivacy {...props}></PolicyPrivacy>         
                                case "Career":
                                    return <Career {...props} list={home.career[0][props.lang]}></Career>           
                                case "Questions":
                                    return <Questions {...props} list={home.questions[0][props.lang]}></Questions>
                                case "Contact":
                                    return <Contact {...props}></Contact>
                                case "Donation":
                                    return <Donation {...props} list={home.donations}></Donation>
                                case "Salon":
                                default:
                                    return <Salon {...props} user={user} home={home} page={page}></Salon>
                            }
                        })()}        
                        {cookies !== '1' ? <Cookies lang={props.lang} cookiesClick={()=>handleCookiesClick()}></Cookies> : null}
                        <Donate lang={props.lang}></Donate>
                        <Footer lang={props.lang}></Footer>
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

function Donate(){
    const dispatch = useDispatch()
    const [open, setOpen] = useState("")

    useEffect(() => {
        setTimeout(function(){
            setOpen("open")
        }, 500)
	}, [])
    
    function handleClick(){        
        dispatch(changePage('Donation'))
    }

	return <div id="donate" className={open} onClick={()=>handleClick()}>
        <Bitcoin></Bitcoin>
    </div>
}

export default Home