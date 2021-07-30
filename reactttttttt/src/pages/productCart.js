import React, { Component, Fragment ,useState  } from 'react';



const ProductCart = (props) =>{
    
    const productDetailHandler=(data)=>{
        props.setModelData(data)
    }
    


    return (
    <div className="col-md-5 col-sm-12 col-xl-4">
        <div className="card product-cart  shadow-lg p-3 mb-5 ml-5 bg-white rounded" >
            <img className="card-img-top" src={props.data.image} alt="Card image cap"/>
            <div className="card-body">
            <h5 className="card-title">{props.data.name}</h5>
            <p className="card-text">{props.data.description}</p>
            <button className="btn btn-primary" onClick={productDetailHandler.bind(this , props.data)} >Details</button>
            
            </div>
        </div>
    </div>  
        

        
    )
}

export default ProductCart