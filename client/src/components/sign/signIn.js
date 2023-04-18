import React, {useState, useEffect} from 'react'
import { translate } from '../../translations/translate'
import { useDispatch } from 'react-redux';
import { changePopup } from '../../reducers/popup'
import { changeUser } from '../../reducers/auth'
import { Form, Button, Col, Row } from 'react-bootstrap';

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
        props.signSubmit({emit: 'signin_send', payload: {user, pass}})
    }

    useEffect(() => {
        socket.on('signin_read', function(data){	
            if(data){
                if(!data.exists){
                    dispatch(changePopup({
                        open: true, 
                        template: "error", 
                        data: translate({lang: lang, info: "signin_error"})
                    }))
                } else {
                    if(data.obj && Object.keys(data.obj).length>0){
                        dispatch(changeUser(data.obj))
                    }
                }
            }
        })
    }, [lang])    

    return <div className="sign_in_container">
        {/* <h3>{translate({lang: props.lang, info: "sign_in"})}</h3> */}
        <Form>
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
                        {translate({lang: lang, info: "sign_in"})}
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
}

export default SignIn