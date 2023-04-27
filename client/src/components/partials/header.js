import React from 'react'
import { translate } from '../../translations/translate'
import logo_icon from '../../img/logo.png'
import { capitalizeFirstLetter, isEmpty } from '../../utils/utils'
import TransparentText from './transparentText'

function Header(props){
    const {lang, template, details} = props
    let title = props.title ? props.title : "BunnyBet"    
	return <div className={"header_container "+template}>
        {(() => {
            if(isEmpty(template)){
                return <h1 className="header">{title}</h1>
            } else {
                switch (template) {
                    case "salon":
                        return <div id="header_salon" className="header">
                            <img id="logo_icon" alt="logo_icon" src={logo_icon} />
                            <h1>{title}</h1>
                            <h3>{translate({lang: lang, info: "salon_subtitle"})}</h3>                                    
                        </div> 
                    case "game":
                        if(typeof details === 'object' && details !== null){ // it means it's a game
                            let table_name = details.game.table_name
                            let table_type = details.game.table_type
                            let table_id = details.game.table_id
                            let title = capitalizeFirstLetter(table_name) + ' ' + table_id
                            if(table_type){
                                title = title  + ' ' + capitalizeFirstLetter(table_type)
                            }                            
                            return <div id="header_game" className="header">
                                <TransparentText text={title}></TransparentText>
                            </div>
                        } else {
                            return <div id="header" className="header">
                                <TransparentText text={title}></TransparentText>                             
                            </div>
                        }
                    case "panel_user":                        
                        if(details && details.game){
                            if(details.game_page){
                                //ex: dashboard
                                return <TransparentText text={translate({lang: lang, info: details.game_page})}></TransparentText>
                            } else {
                                //game
                                let table_name = details.game.table_name
                                let table_id = details.game.table_id
                                let title = capitalizeFirstLetter(table_name) + ' ' + table_id
                                return <h3 id="user_title">
                                    <TransparentText text={title}></TransparentText>
                                </h3>
                            }
                        } else {
                            //salon panel
                            return
                        }
                    case "sign":
                        return <div id="header_sign" className="header">
                            <img id="logo_icon" alt="logo_icon" src={logo_icon} />
                            <h1>{title}</h1>
                            <h3>{translate({lang: lang, info: "subtitle"})}</h3>                                    
                        </div>          
                    default:
                        return
                }
            }            
        })()}
    </div>
}
export default Header