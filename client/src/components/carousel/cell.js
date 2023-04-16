import React from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'

function Cell(props) {
    const {lang, index, data, template, type} = props

	return <>
        {(() => {
            switch (template) {
                case "salon":
                    return <div className="cell_salon_container">
                        <div className="cell_salon shadow_concav">
                            <div className="cell_info">
                                <h4>{data.table_name} {data.table_id}</h4>
                                <p>{data.table_type}</p>
                            </div>
                            <div className="cell_button">
                                <Button 
                                    type="button"  
                                    className="mybutton round button_transparent shadow_convex"
                                    table_name={data.table_name}
                                    table_type={data.table_type}
                                    table_id={data.table_id}
                                >{translate({lang: lang, info: "Click"})}</Button>
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