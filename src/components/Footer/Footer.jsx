import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Footer() {
    const[count, setCount] = useState(0)
  return (
    <footer className='bg-[rgb(242,242,242)]  p-3'>
       <div className="container w-full">
        <h1 className='text-2xl text-[#212529] '>Get the FreshCart app</h1>
        <p className='text-[#6d767e] font-light mb-4 md:text-left'>We will send you a link, open it on your phone to download the app</p>

        <div className="flex mb-5">
          <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block grow me-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Email" required />
          <button className='bg-main text-white rounded-md p-2 w-full md:w-auto'>Share App Link</button>
        </div>

        <div className="partner flex justify-between py-3 border-y-2">
          <div className="payment">
            <p>Payment Partners</p>
          </div>
          <div>
            <div className="app">
              <p>Get deliveries with FreshCart</p>
            </div>
          </div>
        </div>
       </div>
    </footer>
  )
}
