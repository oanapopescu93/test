import React from 'react'
import { translate } from '../../translations/translate'
import logo_icon from '../../img/logo.png'
import { capitalizeFirstLetter, isEmpty } from '../../utils'

function Header(props){
    const {lang, template} = props
    let title = props.title ? props.title : "BunnyBet"

	return <div className="header_container">
        {(() => {
            if(isEmpty(template)){
                return <h1 className="color_yellow">{title}</h1>
            } else {
                if(template === "salon"){
                    return <div id="header_salon" className="header">
                        <img id="logo_icon" alt="logo_icon" src={logo_icon} />
                        <h1>{title}</h1>
                        <h3>{translate({lang: lang, info: "salon_subtitle"})}</h3>                                    
                    </div> 
                } else {
                    if(typeof template === 'object' && template !== null){ // it means it's a game
                        let table_name = template.table_name
                        let table_type = template.table_type
                        let table_id = template.table_id
                        return <div id="header_game" className="header">
                            <h2>{capitalizeFirstLetter(table_name)} {table_id}</h2>
                            {table_type ? <h3>{capitalizeFirstLetter(table_type)}</h3> : null}
                        </div>
                    } else {
                        return <div id="header" className="header">
                            <h2>{title}</h2>                                 
                        </div>
                    }
                }
            }            
        })()}
    </div>
}
export default Header