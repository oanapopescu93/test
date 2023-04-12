import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { setCookie } from '../../utils'
import Game from '../games/pages/game'
import Sapou from '../partials/sapou'
import SalonGames from './salonGames'
import SalonSidebarLeft from './salonSidebarLeft'

function Salon(props) {
    const {lang, home, game} = props 

    function handleExit(){
        setCookie('casino_uuid', '')
        window.location.reload(false)
    }

    return <>
        {game ? <Game lang={lang} template={game} title={game}></Game> : <div className="content_wrap">  
            <Sapou template="salon" lang={lang}></Sapou>
            <SalonGames lang={lang} items={home.products}></SalonGames>
            <div className="page_exit">
                <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent">
                    {translate({lang: lang, info: "exit_salon"})}
                </Button>
            </div>
        </div>}
        <SalonSidebarLeft lang={lang}></SalonSidebarLeft>
    </>
}

export default Salon