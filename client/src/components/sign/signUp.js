import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'
import { useDispatch } from 'react-redux'
import { changePopup } from '../../reducers/popup';
import { changeUser } from '../../reducers/auth';
import { isEmpty, setCookie } from '../../utils';
import { Form, Button, Col, Row } from 'react-bootstrap';

function SignUp(props) {  
    const {lang, socket} = props  
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    let dispatch = useDispatch()

    function handleChange(type, e){
        switch(type) {
            case "email":
                setEmail(e.target.value)
                break
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
        props.signSubmit({emit: 'signup_send', payload: {email, user, pass}})
    }
    
    useEffect(() => {
        socket.on('signup_read', function(data){	
            if(data){
                if(data.exists){
                    let payload = {
                        open: true,
                        template: "signup",
                        title: translate({lang: lang, info: "error"}),
                        data: translate({lang: lang, info: "signup_error"})
                    }
                    dispatch(changePopup(payload))
                } else {
                    console.log('signup_read ', data)
                    if(data.obj && Object.keys(data.obj).length>0){
                        dispatch(changeUser(data.obj))
                        if(!isEmpty(data.obj.uuid)){
                            setCookie("website_uuid", data.obj.uuid)
                        }
                    }
                }
            }
        })
    }, [lang]) 

    return <div className="sign_up_container">
        <h3>{translate({lang: props.lang, info: "sign_up"})}</h3>
        <Form>
            <Row>
                <Col sm={4} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "email"})}</div>
                </Col>
                <Col sm={8}>
                    <input type="text" value={email} onChange={(e)=>{handleChange('email', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col sm={4} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "user"})}</div>
                </Col>
                <Col sm={8}>
                    <input type="text" value={user} onChange={(e)=>{handleChange('user', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col sm={4} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "password"})}</div>
                </Col>
                <Col sm={8}>
                    <input type="password" value={pass} onChange={(e)=>{handleChange('pass', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="button" onClick={(e)=>handleSubmit(e)} className="mybutton button_fullcolor">
                        {translate({lang: lang, info: "sign_up"})}
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
}

export default SignUp