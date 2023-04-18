import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../utils/utils'
import Popup from '../popup/popup'
import Sign from '../sign/sign'
import Home from './home'


function Page(props) {
    let user = useSelector(state => state.auth.user)
    let uuid = user.uuid ? user.uuid : ''

    return <>
        {isEmpty(uuid) ? <Sign lang={props.lang} socket={props.socket}></Sign> : <Home lang={props.lang} socket={props.socket}></Home>}
        <Popup lang={props.lang}></Popup>
    </>
}

export default Page