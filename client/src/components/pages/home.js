import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import Footer from '../partials/footer'
import About from './about'
import Contact from '../contact/contact'
import Salon from '../salon/salon'
import Cookies from '../partials/cookies'
import { changeCookies } from '../../reducers/settings'
import Questions from './questions'
import TermsConditions from './termsConditions'
import PolicyPrivacy from './policyPrivacy'
import Career from './career'
import { ReactComponent as Bitcoin } from '../../img/icons/bitcoin-love-heart.svg'
import { changePage } from '../../reducers/page'
import Donation from './donation'
import Language from '../partials/language'

function Home(props) {
    const {home, page, user, cookies} = props
    let dispatch = useDispatch()
    
    function handleCookiesClick(){
        dispatch(changeCookies())
    }

    return <div id="page-container">
        <Language title={props.lang}></Language>
        {(() => {
            //return <Contact {...props}></Contact>
            switch (page) {
                case "About":
                    return <About {...props}></About>
                case "terms_cond":
                    return <TermsConditions {...props}></TermsConditions>
                case "policy_privacy":
                    return <PolicyPrivacy {...props}></PolicyPrivacy>         
                case "Career":
                    let list_career = []
                    if(home.career && home.career[0] && home.career[0][props.lang]){
                        list_career = home.career[0][props.lang]
                    }
                    return <Career {...props} list={list_career}></Career>           
                case "Questions":
                    let list_questions = []
                    if(home.questions && home.questions[0] && home.questions[0][props.lang]){
                        list_questions = home.questions[0][props.lang]
                    }
                    return <Questions {...props} list={list_questions}></Questions>
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