import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'

function SignUp(props) {  
    const {lang, socket} = props  
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(type, e){
        switch(type) {
            case "email":
                setEmail(e.target.value)
                break
            case "user":
                setUsername(e.target.value)
                break
            case "pass":
                setPassword(e.target.value)
                break
            default:              
          }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(socket){
            socket.emit('signup_send', {email, username, password})
        }
    }

    useEffect(() => {
        socket.on('signup_read', function(data){	
            console.log('signup_read ', data)
        })
    }, []) 

    return <div className="sign_up_container">
        <form>
            <p>Email</p>
            <input type="text" value={email} onChange={(e)=>{handleChange('email', e)}}/>
            <p>User</p>
            <input type="text" value={username} onChange={(e)=>{handleChange('user', e)}}/>
            <p>Password</p>
            <input type="password" value={password} onChange={(e)=>{handleChange('pass', e)}}/>
            <button onClick={(e)=>handleSubmit(e)}className="button_type_01">{translate({lang: lang, info: "sign_up"})}</button>
        </form>
    </div>
}

export default SignUp