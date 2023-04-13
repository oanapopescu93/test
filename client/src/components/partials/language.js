import React from 'react'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../../reducers/settings'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Language(props) {
  let title = props.title
	let dispatch = useDispatch()

  function handleSelect(choice){
		dispatch(changeLanguage(choice))
  }

  return <div className="language">
    <DropdownButton title={title} id="dropdown-menu-align-right" onSelect={handleSelect}>
      <Dropdown.Item eventKey={"ENG"}><span>ENG</span></Dropdown.Item>
      <Dropdown.Item eventKey={"RO"}><span>RO</span></Dropdown.Item>
    </DropdownButton>
  </div>
}

export default Language