import React from 'react'
import Cart from './cart'
import History from './history'

function DashboardRight(props){
    return <>
        <div id="dashboard_right_cart" className="dashboard_box shadow_concav">								
            <Cart {...props}></Cart>
        </div>
        <div id="dashboard_right_history" className="dashboard_box shadow_concav">								
            <History {...props}></History>
        </div>
    </>
}
export default DashboardRight