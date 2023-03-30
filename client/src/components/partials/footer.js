import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'

function Footer(props){
    let dispatch = useDispatch()
    const [date, setDate] = useState('')

    useEffect(() => {
        let my_date = new Date()
		my_date = my_date.getFullYear()
        setDate(my_date)
    }, [])    

    function handleClick(choice){
        dispatch(changePage(choice))
    }

    return <div className="footer_container">
        <div className="footer_list">
            <ul>
                <li onClick={()=>{handleClick('Home')}}><span>Home</span></li>
                <li onClick={()=>{handleClick('About')}}><span>About</span></li>
                <li onClick={()=>{handleClick('Contact')}}><span>Contact</span></li>
            </ul>
        </div>
        <footer>
            <h6>Copyright © <span id="copyright_year">{date}</span> Oana Popescu. {translate({lang: props.lang, info: "all_rights_reserved"})}.</h6>
        </footer>
    </div>
}
export default Footer