import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NotFoundImg from '../../assets/Images/error.svg'

export default function NotFound() {
    const[count, setCount] = useState(0)
  return (
    <div className="container">
      <img src={NotFoundImg} className="w-full" alt="NotFoundImg" />
    </div>
  );
}
