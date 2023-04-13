import React from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'
import ukraine from '../../img/icons/ukraine.svg'

function Donation(props){
    const {lang, list, socket} = props
    let dispatch = useDispatch()
    let donation_type = ["crypto", "paypal"]

    function handleBack(){
        dispatch(changePage('Salon'))
    }

    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "donation"})}</h2>
        <div className="page_content">
            {(() => {
                if(list && list.length>0){
                    return <div className="donation_container">
                        <div className="donation_ukraine">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/fundraisers/explore/search/charities/?query=ukraine">
                                Donation for Ukraine <img id="ukraine_icon" alt="ukraine_icon" src={ukraine}></img>
                            </a>
                        </div>
                        {donation_type.map(function(item01, i){
                            let style = "donation_body donation_body_crypto shadow_concav"
                            if(item01 !== "crypto"){
                                style = "donation_body"
                            }
                            return <div key={i} className="donation_box">
                                <ul className={style}>
                                    {list.map(function(item02, j){
                                        if(item01 === item02.type){
                                            if(item01 === "crypto"){
                                                return (
                                                    <li key={j} className="donation_link donation_link_crypto">
                                                        <p key={i}><span>{item02.title}: </span><b>{item02.text}</b></p>
                                                    </li>
                                                )                                                        
                                            } else if(item01 === "paypal"){
                                                return (                                                                
                                                    <li key={j} className="donation_link donation_link_paypall">
                                                        <a className="paypal_button shadow_convex" rel="noopener noreferrer" target="_blank" href="https://paypal.me/oanapopescu93?country.x=RO&locale.x=en_US">Paypal</a>
                                                    </li>
                                                )
                                            } else {
                                                return null
                                            }
                                        } else {
                                            return null
                                        }   
                                    })}
                                </ul>
                            </div>
                        })}
                    </div>
                } else {
                    return <div className="donation_container">
                        <p>{translate({lang: lang, info: "no_data"})}</p>
                    </div>
                }
            })()} 
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default Donation