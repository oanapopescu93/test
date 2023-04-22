import React from 'react'
import { useDispatch } from 'react-redux'
import { changePage, changeGame, changeGamePage } from '../../../reducers/page'
import { changePopup } from '../../../reducers/popup'
import { translate } from '../../../translations/translate'
import { decryptData } from '../../../utils/crypto'

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
        <h3>{decryptData(user.user)}</h3>
        <p>{decryptData(user.money)}</p>
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