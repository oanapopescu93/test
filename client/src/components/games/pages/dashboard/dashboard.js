import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Dashboard(props){
    return <div className="dashboard_container">
        <Row>
				<Col sm={2}></Col>
				<Col sm={8}>					
					<Row>				
						<Col sm={12}><h2>Profile</h2></Col>
					</Row>
					<Row className="profile_container">
						<Col sm={4} className="profile_container_left">
							<div className="profile_left shadow_concav">								
                                <h3>Informatii utilizator</h3>
								<Row>
									<Col lg={6}>
										picture will come here
									</Col>
									<Col lg={6}>
										<p className="profile_user"><b>User: </b><span id="profile_user_text"></span></p>										
										<p className="profile_animal">
                                            <b>Animal: </b>
											{/* {(() => {
												if(typeof animal !== "undefined" && animal !== "" && animal !== "null" && animal !== null){
													return <>{lang === "ro" ? <>{animal.name_ro}</> : <>{animal.name_eng}</>}</>
												} else {
													return "-"
												}
											})()} */}
										</p>
										<p className="profile_money"><b>Carrots: </b>money</p>
									</Col>
								</Row>								
								<div id="profile_change_username" className="profile_button button_yellow">
                                    <b>Change username</b>
								</div>
								<div id="profile_change_password" className="profile_button button_yellow">
                                    <b>Change password</b>
								</div>
								<div id="profile_buy_carrots" className="profile_button button_yellow">
                                    <b>Buy carrots</b>
								</div>
							</div>
						</Col>
						<Col sm={8} className="profile_container_left hidden-xs">
							<div className="profile_right shadow_concav">								
								History will come here
							</div>
						</Col>
					</Row>
				</Col>
				<Col sm={2}></Col>
			</Row>
    </div>
}
export default Dashboard