import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../../reducers/page'
import { translate } from '../../translations/translate'
import Page from './page'

function Home(props) {
    const {lang, socket} = props
    const [page, setPage] = useState("Home")
    let dispatch = useDispatch()

    function handleClick(choice){
        setPage(choice)
        dispatch(changePage(choice))
    }

    useEffect(() => {
        socket.emit('message_send', "message!!!")    
    }, [])

    socket.on('message_read', function(res){
        console.log('message_read ', res)
    })
    
    return <>
        <p><span>{translate({lang: lang, info: "page_chosen"})}: </span><span>{page}</span></p>
        <ul>
            <li onClick={()=>{handleClick('Home')}}><span>Home</span></li>
			<li onClick={()=>{handleClick('About')}}><span>About</span></li>
            <li onClick={()=>{handleClick('Contact')}}><span>Contact</span></li>
        </ul>
        {props.home.products && props.home.products.length ? <Page {...props}></Page> : <p>{translate({lang: props.lang, info: "error"})}</p>}
    </>
}

export default Home