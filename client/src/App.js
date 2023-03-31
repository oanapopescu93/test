import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'

import * as io from 'socket.io-client'

import "./css/style.css"

import Loader from "./components/partials/loader"
import { bringPayload } from "./reducers/home"
import Page from "./components/pages/page"

const socket = io()

function App() {
  let my_console = function(){
		let oldConsole = null
		let me = {}
	
		me.enable =  function enable(){
			if(oldConsole == null) return
			window['console']['log'] = oldConsole
			window['console']['warn'] = oldConsole
			window['console']['error'] = oldConsole
		}
	
		me.disable = function disable(){
			oldConsole = console.log
			window['console']['log'] = function() {}
			window['console']['warn'] = function() {}
			window['console']['error'] = function() {}
		}
	
		return me
	}()

  	useEffect(() => {
		//my_console.disable()
	}, [])

  	let dispatch = useDispatch()
	let home = useSelector(state => state.home)
  	let lang = useSelector(state => state.settings.lang)

  	useEffect(() => {
		socket.connect()
		dispatch(bringPayload())		

		return () => {
		socket.disconnect()
		}    
	}, [])

  	setInterval(function () {		  
    	socket.emit('heartbeat', { data: "ping" })
  	}, 15000)

  	return <div className="App">    
      	{home.loaded ? <Page home={home} socket={socket} lang={lang}></Page> : <Loader></Loader>}
  	</div>
}

export default App