import React, {useState} from 'react'
import { translate } from '../../translations/translate'
import { Form, Button, Col, Row } from 'react-bootstrap';
import { validateInput } from '../../utils/validate';
import { useDispatch } from 'react-redux';
import { bringPayload } from '../../reducers/contact';

function ContactForm(props){
    const {lang, socket} = props
    let dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [subjectError, setSubjectError] = useState(false)
    const [messageError, setMessageError] = useState(false)

    function handleChange(type, e){
        switch(type) {
            case "email":
                setEmail(e.target.value)
                break
            case "subject":
                setSubject(e.target.value)
                break
            case "message":
                setMessage(e.target.value)
                break
            default:              
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        setSubjectError(false)
        setMessageError(false)
        setEmailError(false)

        if(subject !== "" && message !== "" && validateInput('email', email)){
            dispatch(bringPayload())
        } else {
            if(subject === ""){
                setSubjectError(true)
            }
            if(message === ""){
                setMessageError(true)
            }
            if(!validateInput('email', email)){
                setEmailError(true)
            }
        }
    }

    return <div className="contact_box shadow_convex">
        <Form className="contact_form">
            <Row>
                <Col sm={12} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "email"})}</div>
                </Col>
                <Col sm={12}>
                    <input className="input_light shadow_concav" type="text" value={email} onChange={(e)=>{handleChange('email', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "subject"})}</div>
                </Col>
                <Col sm={12}>
                    <input className="input_light shadow_concav" type="text" value={subject} onChange={(e)=>{handleChange('subject', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="label_container">
                    <div className="label">{translate({lang: props.lang, info: "message"})}</div>
                </Col>
                <Col sm={12}>
                    <textarea className="input_light shadow_concav" type="text" value={message} onChange={(e)=>{handleChange('message', e)}}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="button" onClick={(e)=>handleSubmit(e)} className="mybutton button_fullcolor shadow_convex">
                        {translate({lang: lang, info: "send"})}
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
}
export default ContactForm