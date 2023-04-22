import React, {useState, useEffect} from 'react'
import Header from '../../partials/header'
import { Form, Button } from 'react-bootstrap';
import { translate } from '../../../translations/translate';
import { isEmpty } from '../../../utils/utils';
import { getRoom } from '../game_utils';

function ChatMessages(props){
    const {messages} = props
    console.log(messages)
    return <>
    </>
}

function Chat(props){
    const {lang, socket, page} = props
    let game = page.game
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState('')
    const [height, setHeight] = useState(100)  

    useEffect(() => {
        socket.on('message_read', function(res){
            console.log('message_read ', res)
        })
    }, [socket])    

    function handleChange(e){
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!isEmpty(input)){
            let payload = {
                input: input,
                room: getRoom(game)
            }
            socket.emit('message_send', payload) 
        }
    }

    return <>
        <Header template="panel_user" details={page} lang={lang}></Header>
        <Form className="chat_form">            
            <div id="chatmessages" height={height+'px'} className="input_light">
                <ChatMessages messages={messages}></ChatMessages>
            </div>
            <input className="input_light" type="text" value={input} onChange={(e)=>{handleChange(e)}}/>
            <Button type="button" onClick={(e)=>handleSubmit(e)} className="mybutton button_fullcolor shadow_convex">
                {translate({lang: lang, info: "send"})}
            </Button>
        </Form>
    </>
}
export default Chat