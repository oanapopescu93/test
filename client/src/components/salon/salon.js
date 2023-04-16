import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { setCookie } from '../../utils'
import Header from '../partials/header'
import SalonGames from './salonGames'
import SalonSidebarLeft from './salonSidebarLeft'
import Game from '../games/game'

function Salon(props) {
    const {lang, home, game} = props 

    function handleExit(){
        setCookie('casino_uuid', '')
        window.location.reload(false)
    }

    return <>
        {game ? <Game {...props}></Game> : <>            
            <div className="content_wrap">  
                <Header template="salon" lang={lang}></Header>
                <SalonGames lang={lang} items={home.products}></SalonGames>
                <div className="page_exit">
                    <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent shadow_convex">
                        {translate({lang: lang, info: "exit_salon"})}
                    </Button>
                </div>
            </div>
            <SalonSidebarLeft lang={lang}></SalonSidebarLeft>
        </>}
    </>
}

export default Salon