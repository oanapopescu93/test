import React from 'react'
import { translate } from '../../../translations/translate'

function ContactMap(props){
    const {lang, contactElement} = props
    console.log(contactElement)

    return <div id="contact_map" className="contact_box shadow_concav">
        <div className="contact_map">
            <p>ContactMap</p>
        </div>
    </div>
}
export default ContactMap