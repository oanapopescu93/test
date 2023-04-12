import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'
import { isEmpty } from '../../utils'

function Sapou(props){
    const {lang, template} = props
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')

    useEffect(() => {
		switch (template) {
            case "salon":
                setTitle("salon_title")
                setSubtitle("salon_subtitle")
                break
            default:
                setTitle(template)
                setSubtitle('')
                break
        }
	}, [])

	return <>
        {!isEmpty(title) ? <div className="sapou_container">
            <div className="sapou">
                <h1>{translate({lang: lang, info: title})}</h1>
                {!isEmpty(subtitle) ? <h2>{translate({lang: lang, info: subtitle})}</h2> : null}
            </div>
        </div> : null}
    </>
}
export default Sapou