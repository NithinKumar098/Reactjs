import { productData } from "../util/productData"
import { useState } from "react"
import ProductCart from "./productCart"
import ProductInfo from "./productInfo"

const Products = (props) => {
    const currentUser = props.loginDetails;
    const Products = productData.find(product => (product.userID == currentUser.id))
    const [userProduct, setUserProduct] = useState(Products.products)
    const [model, setmodel] = useState(false)
    const [modelData, setmodelData] = useState('')

    const openModelHandler = (data) => {
        setmodelData(data)
        setmodel(true)
        

    }



    return <>

        <div className="row col-12 mt-5">

            {userProduct.map((product, index) => (

                <ProductCart key={index}
                    data={product}
                    setModelData={(data) => {
                        openModelHandler(data)
                    }}


                />
            ))}
            {model && <ProductInfo modelData={modelData} closeModelHandler={() => {
                setmodel(false)
            }} />}


        </div>
    </>
}

export default Products;
