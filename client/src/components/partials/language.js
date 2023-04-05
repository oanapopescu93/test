import React from 'react'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../../reducers/settings'

function Language(props) {
    let dispatch = useDispatch()
    function handleClick(choice){
		dispatch(changeLanguage(choice))
    }
    return <ul className="language">
        <li onClick={()=>{handleClick('ENG')}}><span>ENG</span></li>
		    <li onClick={()=>{handleClick('RO')}}><span>RO</span></li>
    </ul>
}

export default Language