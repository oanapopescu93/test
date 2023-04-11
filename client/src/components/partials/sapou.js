import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'
import { isEmpty } from '../../utils'
function Sapou(props){
    const {lang, template} = props
    const [title, setTitle] = useState('salon_title')
    const [subtitle, setSubtitle] = useState('salon_subtitle')

    useEffect(() => {
		switch (template) {
            case "salon":
            default:
                setTitle("salon_title")
                setSubtitle("salon_subtitle")
                break
        }
	}, [template])

	return <>
        {!isEmpty(title) && !isEmpty(subtitle) ? <div className="sapou_container">
            <div className="sapou">
                {!isEmpty(title) ? <h1>{translate({lang: lang, info: title})}</h1> : null}
                {!isEmpty(subtitle) ? <h2>{translate({lang: lang, info: subtitle})}</h2> : null}
            </div>
        </div> : null}
    </>
}
export default Sapou