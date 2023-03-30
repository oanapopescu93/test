import React from "react"

import socketIOClient from "socket.io-client/dist/socket.io"


import "./css/style.css"

import Page from "./components/pages/page"
import Loader from "./components/partials/loader"

const socket = socketIOClient("/")

function App() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <div className="App">
        {!data ? <Loader></Loader> : <Page data={data} socket={socket}></Page>}
    </div>
  )
}

export default App