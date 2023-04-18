import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../../../translations/translate'

function RaceTables(props){
    const {lang} = props
    const [bets, setBets] = useState([])

    function getData(){
		props.getData(bets)
	}

    return <div className="game_container race_tables_container">
        <div className="game_start">
            <Button 
                type="button"  
                className="mybutton round button_transparent shadow_convex"
                onClick={()=>getData()}
            >{translate({lang: lang, info: "Click"})}</Button>
        </div>
    </div>
}

export default RaceTables