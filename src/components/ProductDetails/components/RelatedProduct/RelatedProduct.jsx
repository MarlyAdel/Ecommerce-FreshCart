import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ProductItem from "./../../../Shared/ProductItem/ProductItem";

export default function RelatedProduct(props) {
    const[count, setCount] = useState(0)
    const[relatedProducts, setRelatedProduct] = useState([])

    let { categoryId, currentProductId } = props;

    //console.log(categoryId,"category");
    

    function getProduct(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data}) =>{
        //console.log(data.data)
        let result = data.data.filter(product => product.category._id == categoryId && product._id !== currentProductId)
        console.log(result)
        setRelatedProduct(result);
      })
      .catch(err =>{
        console.log(err)
      })
    }

    useEffect(() => {
      getProduct();
    }, [categoryId, currentProductId]);


  return (
    <div className="main-layout container flex-auto">
        {relatedProducts.map((product) => (<ProductItem key={product.id} product={product} hideAddToCart={true}/>))}
    </div>
  )
}
