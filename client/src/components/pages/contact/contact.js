import React, {useState} from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { changePage } from '../../../reducers/page'
import { translate } from '../../../translations/translate'
import ContactForm from './contactForm'
import ContactList from './contactList'
import ContactMap from './contactMap'

function Contact(props){
    const [contactElement, setContactElement] = useState(null)
    let dispatch = useDispatch()

    function handleBack(){
        dispatch(changePage('Salon'))
    }

    function handleChooseContactElement(x){
        setContactElement(x)
    }

    return <div className="content_wrap">
        <h2 className="title">{translate({lang: props.lang, info: "contact"})}</h2>        
        <div className="page_content">
            <Row>
                <Col sm={4} md={4} lg={4}>
                    <ContactForm lang={props.lang} socket={props.socket}></ContactForm>
                </Col>
                <Col sm={8} md={8} lg={8}>
                    <ContactList lang={props.lang} list={props.home.contact} handleChooseContactElement={(e)=>handleChooseContactElement(e)}></ContactList>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <ContactMap lang={props.lang} contactElement={contactElement}></ContactMap>
                </Col>
            </Row>
        </div>
        <div className="text_center">
            <Button type="button" onClick={()=>handleBack()} className="mybutton round button_transparent shadow_convex">
                {translate({lang: props.lang, info: "back"})}
            </Button>
        </div>
    </div>
}
export default Contact