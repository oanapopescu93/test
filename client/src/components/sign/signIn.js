import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'

function SignIn(props) {  
    const {lang, socket} = props  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(type, e){
        switch(type) {
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
            socket.emit('signin_send', {username, password})
        }
    }

    useEffect(() => {
        socket.on('signin_read', function(data){	
            if(!data.exists){
                console.log('no user ', data)
            } else {
                if(Object.keys(data.obj).length === 0){
                    console.log('password was wrong ', data)
                }
            }
        })
    }, [])    

    return <div className="sign_in_container">
        <form>
            <p>User</p>
            <input type="text" value={username} onChange={(e)=>{handleChange('user', e)}}/>
            <p>Password</p>
            <input type="password" value={password} onChange={(e)=>{handleChange('pass', e)}}/>
            <button onClick={(e)=>handleSubmit(e)}className="button_type_01">{translate({lang: lang, info: "sign_in"})}</button>
        </form>
    </div>
}

export default SignIn