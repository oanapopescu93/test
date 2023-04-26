import React from 'react'
import { translate } from '../../../../../translations/translate'

function History(props){
    const {lang, history} = props
    return <div className="history_container box">								
        {history && history.length>0 ? <div className="history">
            <p>history!!!</p>
        </div> : <div className="history">
            <p>{translate({lang: lang, info: "no_history"})}</p>
        </div>}
    </div>
}
export default History