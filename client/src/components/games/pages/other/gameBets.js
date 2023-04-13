import React from 'react'
import RouletteTable from '../roulette/rouletteTable'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

function GameBets(props){
    let open = props.open ? "open" : ""
    let template = props.game.table_name

    function handleClose(){
        props.closeTable()
    }

    return <div className={"game_bets_container " + open}>
        <div className="game_bets shadow_concav">
            <div className="close" onClick={()=>handleClose()}>x</div>
            <div className="game_bets_box">						
                {(() => {
                    switch (template) {
                        case "roulette":
                            return <RouletteTable {...props}></RouletteTable>               
                        default:
                            return null
                    }
                })()}
                <div className="game_bets_clear">
                    <div id="game_bets_clear" className="shadow_convex"><FontAwesomeIcon icon={faTrashCan}/></div>
                </div>
            </div>
        </div>
    </div>
}

export default GameBets