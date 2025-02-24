import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductsContent from '../ProductsContent/ProductsContent'

export default function Products() {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <ProductsContent/>
    </div>
  );
}
