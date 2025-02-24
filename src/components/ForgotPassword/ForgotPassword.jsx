import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function sendRestCode(email){
      
      try {
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{email});
        setMessage("Reset code sent to your email");
         navigate("/verify-code")
      } 
      catch (error) {
        setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
      }
    }

    useEffect(() => {
      sendRestCode(email);
    }, [email]);

    function handleSubmit(e) {
      e.preventDefault();
      sendRestCode(email);
    }

  return (
    <div className="container h-[100vh] px-3">
      <h2 className="text-4xl my-4 font-semibold">Please Enter your Email</h2>
      <form className="relative z-0 w-full mb-5 group" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full my-10 group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          />

          <button
            type="submit"
            className="mt-8 text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}
