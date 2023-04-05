import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'

function Footer(props){
    let dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [up, setUp] = useState('')

    useEffect(() => {
        handleDate()
    }, [])    

    function handleDate(){
        let my_date = new Date()
		my_date = my_date.getFullYear()
        setDate(my_date)
    }

    function handleClick(choice){
        dispatch(changePage(choice))
    }

    function handleFooterUp(){
        if(up === ''){
            setUp('up')
        } else {
            setUp('')
        }
    }

    return <div className={"footer_container " + up}>
        <div className="footer_button_container">
            <div className="footer_button" onClick={()=>handleFooterUp()}>
                <span>Footer</span>
            </div>
        </div>
        <div className="footer_body">
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
    </div>
}
export default Footer