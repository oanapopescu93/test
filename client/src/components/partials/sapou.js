import React from 'react'
import { translate } from '../../translations/translate'
function Sapou(props){
    const {lang} = props

	return <div className="sapou_container">
		<div className="sapou">
            <h1>{translate({lang: lang, info: 'title'})}</h1>
            <h2>{translate({lang: lang, info: 'subtitle'})}</h2>
            <h3>{translate({lang: lang, info: 'description'})}</h3>
        </div>
	</div>
}
export default Sapou