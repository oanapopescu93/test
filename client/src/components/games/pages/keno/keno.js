import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'
import KenoAnimation from './kenoAnimation'
import KenoBoard from './kenoBoard'
import { changePopup } from '../../../../reducers/popup'

function Keno(props){    
    let dispatch = useDispatch()
    const [start, setStart] = useState(false)
    const [data, setData] = useState(null)

    function startGame(){
        if(data && data.list && data.list.length>0){
            setStart(true)
        } else {
            let payload = {
                open: true,
                template: "error",
                title: translate({lang: props.lang, info: "error"}),
                data: translate({lang: props.lang, info: "no_selections"})
            }
            dispatch(changePopup(payload))
        }        
    }

    function getData(x){
        setData(x)
    }    

    function handleShowPrizes(){
        let payload = {
            open: true,
            template: "keno_prizes",
            title: translate({lang: props.lang, info: "keno_prizes"}),
            data: props.home.keno_prizes,
            size: 'lg',
        }
        dispatch(changePopup(payload))
    }

    return <>
        {start ? <KenoAnimation 
            {...props} 
            data={data}            
            handleShowPrizes={()=>handleShowPrizes()}
        ></KenoAnimation> : <KenoBoard 
            {...props} 
            startGame={()=>startGame()}
            getData={(e)=>getData(e)}
        ></KenoBoard>}
    </>
}

export default Keno