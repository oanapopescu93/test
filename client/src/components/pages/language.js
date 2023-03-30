import React, {useState} from 'react'
import { getCookie } from '../../utils'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../../reducers/settings'
import { translate } from '../../translations/translate'

function Language(props) {
    const [lang, setlang] = useState(getCookie("website_language") === '' ? 'ENG' : getCookie("website_language"))
    let dispatch = useDispatch()

    function handleClick(choice){
		setlang(choice)
		dispatch(changeLanguage(choice))
    }

    return <>
        <p><span>{translate({lang: lang, info: "language_chosen"})}: </span><span>{lang}</span></p>
        <ul>
            <li onClick={()=>{handleClick('ENG')}}><span>ENG</span></li>
			<li onClick={()=>{handleClick('RO')}}><span>RO</span></li>
        </ul>
    </>
}

export default Language