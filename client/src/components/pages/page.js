import React, {useState, useEffect} from 'react'
import { useSelector} from 'react-redux'

function Page(props) {
    let message = props.data.message
    return <div>{message}</div>
}

export default Page