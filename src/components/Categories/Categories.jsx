import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CategoriesContent from '../CategoriesContent/CategoriesContent'
import { Helmet } from 'react-helmet'

export default function Categories() {
    const[count, setCount] = useState(0)
  return (
    <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
      <div className="container">
        <h1 className="text-center my-6 text-5xl font-semibold text-[#4FA74F]">
          Categories
        </h1>
        <CategoriesContent />
      </div>
    </>
  );
}
