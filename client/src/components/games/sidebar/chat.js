import React, {useEffect} from 'react'
function Chat(props){
    const {lang, socket} = props

    useEffect(() => {
        socket.emit('message_send', "message!!!")    
    }, [])

    socket.on('message_read', function(res){
        console.log('message_read ', res)
    })

    return <>
        <p>Chat</p>
    </>
}
export default Chat