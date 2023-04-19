import React from 'react'
import { translate } from '../../translations/translate'
import logo_splash from '../../img/logo.png'

function Splash(props) {
    const {lang, progressNumber} = props

	return <div id="splash_screen">
        <div className="splash_screen_container">
            <div className="content_box">
                <img id="logo_splash" alt="logo_splash" src={logo_splash} />
                <div className="content-dot">
                    <div className="content">
                        <h1 className="splash_title">BunnyBet</h1>
                    </div>                    
                </div>
                <h3 className="splash_subtitle">{translate({lang: lang, info: "subtitle"})}</h3>
                <div className="progress_container">
                    <div className="progress_box">
                        <div className="progress" style={{width: progressNumber + '%'}}></div>
                    </div>
                    <div className="progress_text" style={{width: progressNumber + '%'}}>
                        <span>{progressNumber} %</span>
                    </div>
                </div>
            </div>              
            
            <div className="main-diamond-outer">
                <div className="main-diamond-inner"></div>
            </div>
            
            <div className="mid-diamond-left"></div>
            <div className="mid-diamond-right"></div>

            <div className="small-diamond-left-top"></div>
            <div className="small-diamond-left-bottom"></div>
            <div className="small-diamond-right-top"></div>
            <div className="small-diamond-right-bottom"></div>

            <div className="small-diamond-1"></div>
            <div className="small-diamond-2"></div>
            <div className="small-diamond-3"></div>
            <div className="small-diamond-4"></div>
        </div>
    </div>	
}

export default Splash