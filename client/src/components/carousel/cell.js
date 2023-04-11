import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'

function Cell(props) {
    const {lang, index, data} = props
    let template = props.template ? props.template : null

    function handleClick(x){
        console.log('click ', x)
    }

	return <>
        {(() => {
            switch (template) {
                case "salon":
                    return <div className="cell_salon_container" key={index}>
                        <div className="cell_salon" key={index}>
                            <div className="cell_info">
                                <h4>{data.table_name} {data.table_id}</h4>
                                <p>{data.table_type}</p>
                            </div>
                            <div className="cell_button">
                                <Button type="button" onClick={()=>handleClick()} className="mybutton round button_transparent">{translate({lang: lang, info: "Click"})}</Button>
                            </div>
                        </div>
                    </div>
                default:
                    return <div key={index}></div>
            }
        })()}
        
    </>
}

export default Cell