import giftPic from '../../img/chest/chest.gif'

function Welcome(props){     
    return <div className="welcome_popup">
        {(() => {
            switch(props.lang) {
                case "RO":
                    return <p>100 de morcovi gratis!</p>
                case "ENG":
                default: 
                    return <p>Free 100 carrots!</p>
            }
        })()}
        <img alt="gift_img" src={giftPic}/>
    </div>
}
export default Welcome