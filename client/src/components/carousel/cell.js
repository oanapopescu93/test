import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import Counter from '../partials/counter'

function Cell(props) {
    const {lang, index, data, template, type} = props
    const [qty, setQty] = useState(1)

    function updateQtyMarket(x){
        setQty(x)
    }

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
                case "market":
                    let price = data.price
                    return <div className="cell_market_container">
                        <div className="cell_market shadow_concav">
                            <div className="cell_info">
                                {(() => {
                                    switch(lang) {
                                        case "RO":
                                            return <h4>{data.name_ro}</h4>
                                        case "ENG":
                                        default: 
                                            return <h4>{data.name_eng}</h4>
                                    }
                                })()}
                                <p>{translate({lang: lang, info: "price"})}: {price}</p>
                                <Counter update={(e)=>updateQtyMarket(e)}></Counter>
                            </div>                            
                            <div className="cell_button">
                                <Button 
                                    type="button"  
                                    className="mybutton round button_transparent shadow_convex"
                                    market_qty={qty}
                                    market_id={data.id}
                                >{translate({lang: lang, info: "buy"})}</Button>
                            </div>
                        </div>
                    </div>
                default:
                    return <div key={index}>zzz</div>
            }
        })()}
        
    </>
}

export default Cell