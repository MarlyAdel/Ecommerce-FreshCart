import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductsContent from '../ProductsContent/ProductsContent'
import { Helmet } from 'react-helmet';

export default function Products() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container">
        <ProductsContent />
      </div>
    </>
  );
}
