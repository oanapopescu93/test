import React from 'react'

function Cell(props) {
    const {lang, index, data, template} = props
    console.log(lang, index, data, template)

    function handleClick(x){
        console.log('click ', x)
    }

	return <>
        <div key={index}>
        <h4>{index}</h4>
    </div>
    </>
}

export default Cell