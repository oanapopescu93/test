import React from 'react'
import { useDispatch } from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { changePopup } from '../../../reducers/popup'
import { translate } from '../../../translations/translate'
import { decryptData } from '../../../utils/crypto'
import Header from '../../partials/header'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import carrot_img from '../../../img/icons/carrot_icon.png'

function User(props){
    const {lang, user} = props
    let dispatch = useDispatch()

    function handleChange(choice){
        switch (choice) {
			case "dashboard":
			case "market":
                dispatch(changeGamePage(choice))
				break
            case "settings":
                let payload = {
                    open: true,
                    template: "settings",
                    title: translate({lang: lang, info: "settings"}),
                }
                dispatch(changePopup(payload))
				break
            case "contact":
                dispatch(changePage(choice))
                dispatch(changeGame(null))
				break
            default:
                break
		}
    }

    return <>
        <Header template="panel_user" details={props.page} lang={props.lang}></Header>
        <div id="user_subtitle">
            <div className="user_subtitle_left">
                <span id="user_name">{decryptData(user.user)}</span>
            </div>
            <div className="user_subtitle_right">
                <span id="user_money">
                    <span>{decryptData(user.money)}</span>
                    <img alt="carrot_img" className="currency_img" src={carrot_img}/>
                </span>
                <span id="user_streak">
                    <span>1</span>
                    <div className="my_tooltip">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        {(() => {
                            switch (lang) {
                                case "RO":
                                    return <span className="my_tooltiptext">
                                    <p>Cate zile la rand ai jucat</p>
                                </span>                                
                                case "ENG":
                                default:
                                    return <span className="my_tooltiptext">
                                    <p><b>Your streak</b></p>
                                    <p>How many days in a row you have played</p>
                                </span>
                            }
                        })()}
                    </div>
                </span>
            </div>
         </div>
        <div className="user_panel_tabs">
            <div className="user_panel_tab" onClick={()=>{handleChange('dashboard')}}>
                <span>{translate({lang: lang, info: "user"})}</span>
            </div>
            <div className="user_panel_tab" onClick={()=>{handleChange('market')}}>
                <span>{translate({lang: lang, info: "market"})}</span>
            </div>
        </div>
        <ul className="user_panel_list">
            <li onClick={()=>{handleChange('settings')}}><span>{translate({lang: lang, info: "settings"})}</span></li>
            <li onClick={()=>{handleChange('contact')}}><span>{translate({lang: lang, info: "contact"})}</span></li>
        </ul>
    </>
}
export default User