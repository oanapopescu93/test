import React from 'react'

function Products(props) {
    const {products} = props

    function handleClick(x){
        console.log('click ', x)
    }

    return <>{products && products.length>0 ? <div>        
            {products.map(function(item, i){
                return <div key={i} onClick={()=>{handleClick(i)}}>
                    <div className="product_image">
                        <div className="cropped">
                            <img className={"cropped_image_" + i} src={item.img} alt="product"></img>
                        </div>
                    </div>
                    <div className="product_info">
                        <p><span>{item.name}</span></p>
                    </div>
                </div>
            })}
        </div> : null}
    </>
}

export default Products
