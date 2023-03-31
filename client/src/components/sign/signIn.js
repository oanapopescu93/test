import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'
import { useDispatch } from 'react-redux';
import { changePopup } from '../../reducers/popup'
import { changeUser } from '../../reducers/auth'

function SignIn(props) {  
    const {lang, socket} = props  
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    let dispatch = useDispatch()

    function handleChange(type, e){
        switch(type) {
            case "user":
                setUser(e.target.value)
                break
            case "pass":
                setPass(e.target.value)
                break
            default:              
          }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(socket){
            socket.emit('signin_send', {user, pass})
        }
    }

    useEffect(() => {
        socket.on('signin_read', function(data){	
            if(data){
                console.log('signin_read ', data)
                if(!data.exists){
                    let payload = {
                        open: true,
                        template: "signin",
                        title: translate({lang: lang, info: "error"}),
                        data: translate({lang: lang, info: "signin_error"})
                    }
                    dispatch(changePopup(payload))
                } else {
                    if(data.obj && Object.keys(data.obj).length>0){
                        dispatch(changeUser(data.obj))
                    }
                }
            }
        })
    }, [lang])    

    return <div className="sign_in_container">
        <h3>{translate({lang: props.lang, info: "sign_in"})}</h3>
        <form>
            <div className="label">{translate({lang: props.lang, info: "user"})}</div>
            <input type="text" value={user} onChange={(e)=>{handleChange('user', e)}}/>
            <div className="label">{translate({lang: props.lang, info: "password"})}</div>
            <input type="password" value={pass} onChange={(e)=>{handleChange('pass', e)}}/>
            <button onClick={(e)=>handleSubmit(e)} className="mybutton button_fullcolor">{translate({lang: lang, info: "sign_in"})}</button>
        </form>
    </div>
}

export default SignIn