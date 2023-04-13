import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { translate } from '../../../../translations/translate'

function Slots(props){
    const {lang} = props
    let dispatch = useDispatch()

    useEffect(() => {
        console.log('roulette01')
        return () => {
          console.log('roulette02')
        }
    }, [])

    return <div className="game_container">
        <p>Slots</p>
    </div>
}

export default Slots