import React, {useState} from 'react'
import RaceGame from './raceGame'
import RaceTables from './raceTables'

function Race(props){
    const [startRace, setStartRace] = useState(false)
    const [bets, setBets] = useState([])

    function getData(x){
        setBets(x)
		setStartRace(true)
	}

    return <>
        {(() => {
            if (startRace) {
                return <RaceGame {...props} bets={bets}></RaceGame>
            } else {
                return <RaceTables {...props} getData={()=>getData()}></RaceTables>
            }	
        })()}
    </>
}

export default Race