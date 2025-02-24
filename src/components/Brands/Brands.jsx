import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import BrandsContent from '../BrandsContent/BrandsContent'

export default function Brands() {
    const[count, setCount] = useState(0)
  return (
    <div className="container">
      <h1 className='text-center my-6 text-5xl font-semibold text-[#4FA74F]'>All Brands</h1>
      <BrandsContent/>
    </div>
  );
}
