import React from 'react'
import { translate } from '../../translations/translate'
import logo_icon from '../../img/logo.png'
import { capitalizeFirstLetter, isEmpty } from '../../utils/utils'

function Header(props){
    const {lang, template, details} = props
    let title = props.title ? props.title : "BunnyBet"

	return <div className="header_container">
        {(() => {
            if(isEmpty(template)){
                return <h1 className="color_yellow">{title}</h1>
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
                            return <div id="header_game" className="header">
                                <h2>{capitalizeFirstLetter(table_name)} {table_id}</h2>
                                {table_type ? <h3>{capitalizeFirstLetter(table_type)}</h3> : null}
                            </div>
                        } else {
                            return <div id="header" className="header">
                                <h2>{title}</h2>                                 
                            </div>
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