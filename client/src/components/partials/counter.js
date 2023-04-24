import React, {useState} from 'react'

function Counter(props){
  let [num, setNum]= useState(1)

  function increase(){
    setNum(Number(num)-1)
    if(typeof props.update === "function"){
        props.update(Number(num)-1)
    }
  }
  function decrease(){
    if(num>0){
        setNum(Number(num)+1)
        if(typeof props.update === "function"){
            props.update(Number(num)+1)
        }
    }
  }

  function handleChange(e){
    setNum(e.target.value)
    if(typeof props.update === "function"){
        props.update(e.target.value)
    }
  }

  return <div className="counter">
    <div className="counter_minus_box">
        <div className="counter_minus" onClick={()=>increase()}>-</div>
    </div>
    <div className="counter_input_box">
        <input className="input_light counter_input" type="text" value={num} onChange={(e)=>{handleChange(e)}}/>
    </div>    
    <div className="counter_plus_box">
        <div className="counter_plus" onClick={()=>decrease()}>+</div>
    </div>
  </div>
}
export default Counter