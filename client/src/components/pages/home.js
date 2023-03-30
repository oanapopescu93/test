import React from 'react'
import { getCookie, isEmpty } from '../../utils'
import Sign from '../sign/sign'
import HomePage from './homePage'

function Home(props) {
    let uuid = getCookie("website_uuid")
    return <div className="page_container">
        {isEmpty(uuid) ? <Sign lang={props.lang} socket={props.socket}></Sign> : <HomePage {...props}></HomePage>}
    </div>
}

export default Home