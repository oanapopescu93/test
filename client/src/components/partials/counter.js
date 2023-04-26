import React, {useState} from 'react'

function Counter(props){
  let [num, setNum]= useState(props.num ? props.num : 1)
  let max = props.max ? props.max : 100

  function increase(){
    if(num<max){
      setNum(Number(num)+1)
      if(typeof props.update === "function"){
          props.update(Number(num)+1)
      }
    }
  }
  function decrease(){
    if(num>0){
        setNum(Number(num)-1)
        if(typeof props.update === "function"){
            props.update(Number(num)-1)
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
        <div className="counter_minus" onClick={()=>decrease()}>-</div>
    </div>
    <div className="counter_input_box">
        <input className="input_light counter_input" type="text" value={num} onChange={(e)=>{handleChange(e)}}/>
    </div>    
    <div className="counter_plus_box">
        <div className="counter_plus" onClick={()=>increase()}>+</div>
    </div>
  </div>
}
export default Counter