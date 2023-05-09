import React, {useState, useEffect} from 'react'
import { translate } from '../../../../translations/translate'
import { Button, Row, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Counter from '../../../partials/counter'

function KenoSpot(config){
	let self = this
	self.number = config.number
    self.status = false // true = selected, false = unselected
	self.change_status = function(status){
        if(status === "selected"){
            self.status = true            
        } else if(status === "deselected"){
            self.status = false            
        } else {
            self.status = !self.status
        }
	}
    self.get_number = function(){
		return self.number
	}
    self.get_status = function(){
		return self.status
	}
}

function KenoBoard(props){    
    const {lang, socket} = props
    const [kenoSpots, setKenoSpots] = useState([])
    const [titleDropdown1, setTitleDropdown1] = useState(1)
    const [titleDropdown2, setTitleDropdown2] = useState(1)  
    const [quickPickLength, setQuickPickLength] = useState(1)    

    useEffect(() => {
        let array = []
        for(let i=1; i<=80; i++){
            let kenoSpot = new KenoSpot({number: i})
            array.push(kenoSpot)
        }
        setKenoSpots(array)
    }, [])

    function handleClick(item){
        let array = [...kenoSpots]
        for(let i in array){  
            if(item.get_number() === array[i].get_number()){
                array[i].change_status()
            }
        }
        setKenoSpots(array)
        if(typeof props.getData === "function"){
            props.getData({list: getSelections(array), price_per_game: titleDropdown1, no_of_games: titleDropdown2})
        }
    }

    function getSelections(array){
        let list = []
        for(let i in array){
            if(array[i].get_status()){
                list.push(array[i].get_number())
            }
        }
        return list
    }

    function handleDropdown(type, e){
        switch(type){
            case "price_per_game":
                setTitleDropdown1(e)
                break
            case "no_of_games":
                setTitleDropdown2(e)
                break
            default:
        }
    }

    function handleQuickPick(){
        resetKenoSpots()
        let array = [...kenoSpots]
        generatePick(quickPickLength).then(function(data){
            for(let i in array){  
                for(let j in data){  
                    if(array[i].get_number() === data[j]){
                        array[i].change_status()
                        break
                    }
                }
            }
            setKenoSpots(array)
            if(typeof props.getData === "function"){
                props.getData({list: data, price_per_game: titleDropdown1, no_of_games: titleDropdown2})
            }
        })
    }

    function resetKenoSpots(){
        let array = [...kenoSpots]
        for(let i in array){  
            array[i].change_status("deselected")
        }
        return array
    }

    function generatePick(length){
		return new Promise(function(resolve, reject){
			let keno_payload_server = {
				uuid: props.user.uuid,
				length: length, 
				max: 80,
                reason: "quick_pick"
			}
			socket.emit('keno_send', keno_payload_server)
			socket.on('keno_read', function(data){
				if(data){
					resolve(data)
				} else {
					resolve([])
				}
			})
		})
	}

    function updateQuickPickLength(e){
        setQuickPickLength(e)
    }

    function handleStart(){
        if(typeof props.startGame !== "undefined"){
            props.startGame()
        }
    }
    
    return <div className="keno_board_container">        
        {kenoSpots && kenoSpots.length>0 ? <>
            <p>{translate({lang: lang, info: "keno_instructions"})}</p>
            <Row id="keno_form" className="keno_form">
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Row>
                        <Col sm={6}>
                            <Counter num={1} max={10} update={(e)=>updateQuickPickLength(e)}></Counter>
                        </Col>
                        <Col sm={6}>
                            <Button 
                                type="button"  
                                className="mybutton button_transparent shadow_convex remove"
                                onClick={()=>{handleQuickPick()}}
                            ><span>{translate({lang: lang, info: "quick_pick"})}</span></Button>  
                        </Col>
                    </Row>
                    
                </Col>
                <Col sm={2}></Col>   
            </Row>            
            <div className="keno_board shadow_convex">
                {kenoSpots.map(function(item, i){ 
                    let number = item.get_number()
                    let selected = ""
                    if(item.get_status()){
                        selected = " selected"
                    }
                    if(number % 10 === 0){
                        return <>                        
                            <div key={i} className={"keno_spot" + selected} onClick={()=>handleClick(item)}>
                                <div className="keno_spot_box">{number}</div>
                            </div>
                            <br></br>
                        </>
                    } else {
                        return <div key={i} className={"keno_spot" + selected} onClick={()=>handleClick(item)}>
                            <div className="keno_spot_box">{number}</div>
                        </div>
                    }
                })}
            </div>
            <Row className="keno_options">
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Row>
                        <Col xs={4} md={4} lg={5}>
                            <p>{translate({lang: lang, info: "price_per_game"})}</p>
                            <DropdownButton title={titleDropdown1} id="keno_price_per_game" onSelect={(e)=>handleDropdown("price_per_game", e)}>
                                <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                                <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                                <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                                <Dropdown.Item eventKey={5}>5</Dropdown.Item>
                                <Dropdown.Item eventKey={10}>10</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col xs={4} md={4} lg={5}>
                            <p>{translate({lang: lang, info: "no_of_games"})}</p>
                            <DropdownButton title={titleDropdown2} id="keno_no_of_games" onSelect={(e)=>handleDropdown("no_of_games", e)}>
                                <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                                <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                                <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                                <Dropdown.Item eventKey={5}>5</Dropdown.Item>
                                <Dropdown.Item eventKey={10}>10</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col xs={4} md={4} lg={2}>
                            <Button 
                                type="button"  
                                className="mybutton round button_transparent shadow_convex remove"
                                onClick={()=>{handleStart()}}
                            ><span>{translate({lang: lang, info: "start"})}</span></Button>  
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}></Col>   
            </Row>
        </> : null}
    </div>
}

export default KenoBoard