import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DashboardLeft from './dashboardLeft'
import DashboardRight from './dashboardRight'

function Dashboard(props){
    return <div className="dashboard_container">
        <Row>
			<Col sm={2}></Col>
			<Col sm={8}>					
				<Row>				
					<Col sm={12}><h2>Dashboard</h2></Col>
				</Row>
				<Row>
					<Col sm={4}>
						<DashboardLeft {...props}></DashboardLeft>
					</Col>
					<Col sm={8}>
						<DashboardRight {...props}></DashboardRight>
					</Col>
				</Row>
			</Col>
			<Col sm={2}></Col>
		</Row>
    </div>
}
export default Dashboard