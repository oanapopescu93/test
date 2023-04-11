import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { setCookie } from '../../utils'
import Sapou from '../partials/sapou'
import SalonGames from './salonGames'

function Salon(props) {
    const {lang, home} = props  
    function handleExit(){
        setCookie('casino_uuid', '')
        window.location.reload(false)
    }
    return <>
        <Sapou template="salon" lang={lang}></Sapou>
        <SalonGames lang={lang} items={home.products}></SalonGames>
        <div className="page_exit">
            <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent">{translate({lang: lang, info: "exit_salon"})}</Button>
        </div>
    </>
}

export default Salon