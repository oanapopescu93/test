import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '../../translations/translate'
import { changePage, changeGame, changeGamePage, changeRoom } from '../../reducers/page'

import Header from '../partials/header'

import Roulette from './pages/roulette/roulette'
import Slots from './pages/slots/slots'
import Craps from './pages/craps/craps'
import Race from './pages/race/race'
import Keno from './pages/keno/keno'
import Panel from './sidebar/panel'
import Blackjack from './pages/blackjack/blackjack'
import { getRoom } from '../../utils/games'

import roulette_loading_icon from '../../img/icons_other/icons/yellow/roulette.png'
import blackjack_loading_icon from '../../img/icons_other/icons/yellow/blackjack.png'
import slots_loading_icon from '../../img/icons_other/icons/yellow/slots.png'
import craps_loading_icon from '../../img/icons_other/icons/yellow/craps.png'
import race_loading_icon from '../../img/icons_other/icons/yellow/race.png'
import keno_loading_icon from '../../img/icons_other/icons/yellow/keno.png'

function Game(props){
    const {lang, page, socket} = props
    let game = page.game
    let title = game.table_name ? game.table_name : ""
    let dispatch = useDispatch()
    const [chatRoomUsers, setChatRoomUsers] = useState([])
    let room = useSelector(state => state.page.room)

    function results(payload){
        if(payload && payload.bet && payload.bet>0){ //send results to server only if he bet
            socket.emit('game_results_send', payload)
            console.log('game_results_send ', payload)
        }
    }

    function handleExit(){
        dispatch(changePage('Salon'))
        dispatch(changeGame(null))
        dispatch(changeGamePage(null))
    }

    useEffect(() => {
        let room = getRoom(game)
        socket.emit('join_room', {room: room, uuid: props.user.uuid, user: props.user.user}) 
        socket.on('chatroom_users_read', function(res){
            setChatRoomUsers(res)
            dispatch(changeRoom(room))
        })
        return () => {
			socket.emit('leave_room', {room: room, uuid: props.user.uuid, user: props.user.user}) 
            socket.on('chatroom_users_read', function(res){
                setChatRoomUsers(res)
            })
            dispatch(changeRoom(null))
		} 
    }, [socket])      

    return <>
        <div className="content_wrap">
            <Header template="game" details={page} lang={lang}></Header>
            {(() => {
                switch (title) {
                    case "roulette":
                        if(room){
                            return <Roulette {...props} results={(e)=>results(e)}></Roulette>
                        } else {
                            return <img src={roulette_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }
                    case "blackjack":
                        if(room){
                            return <Blackjack {...props} results={(e)=>results(e)}></Blackjack>
                        } else {
                            return <img src={blackjack_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }
                    case "slots":
                        if(room){
                            return <Slots {...props} results={(e)=>results(e)}></Slots>
                        } else {
                            return <img src={slots_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }
                    case "craps":
                        if(room){
                            return <Craps {...props} results={(e)=>results(e)}></Craps>
                        } else {
                            return <img src={craps_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }                        
                    case "race":
                        if(room){
                            return <Race {...props} results={(e)=>results(e)}></Race>
                        } else {
                            return <img src={race_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }                        
                    case "keno":
                        if(room){
                            return <Keno {...props} results={(e)=>results(e)}></Keno>
                        } else {
                            return <img src={keno_loading_icon} className="game_loading_icon" alt="game_loading_icon"/>
                        }                        
                    default:
                        return <p>{translate({lang: lang, info: "error"})}</p>
                }
            })()}
            <div className="page_exit">
                <Button id="exit_salon" type="button" onClick={()=>handleExit()} className="mybutton button_transparent shadow_convex">
                    {translate({lang: lang, info: "exit_game"})}
                </Button>
            </div>
        </div>
        <Panel {...props} chatRoomUsers={chatRoomUsers}></Panel>
    </>
}

export default Game