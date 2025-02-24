import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import loader from '../../../assets/Images/loading.gif'

export default function Loader() {
    const[count, setCount] = useState(0)
  return (
    <div className='flex justify-center items-center'>
      <img src={loader} alt="loader" className="w-[500px]"/>
    </div>
  );
}
