import React, {useEffect} from 'react'
import Header from '../../partials/header'
function Chat(props){
    const {lang, socket, page} = props

    useEffect(() => {
        socket.emit('message_send', "message!!!")    
    }, [])

    socket.on('message_read', function(res){
        console.log('message_read ', res)
    })

    return <>
        <Header template="panel_user" details={page} lang={lang}></Header>
        <div>
            Chat
        </div>
    </>
}
export default Chat