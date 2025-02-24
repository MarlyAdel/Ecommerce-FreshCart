import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { counterContext } from '../../Context/counterContext'
import RecentProducts from './components/RecentProducts/RecentProducts'
import PopularCategories from './components/PopularCategories/PopularCategories'
import StaticSlider from './components/StaticSlider/StaticSlider'

export default function Home() {
    const[count, setCount] = useState(0)

   

  

  return (
    <div>
      <StaticSlider/>
      <PopularCategories/>
      <RecentProducts/>
    </div>
  )
}
