import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyCode() {
    const [resetCode, setResetCode] = useState("");
    const [message, setMessage]= useState("")
    const navigate = useNavigate()
    
    async function verifyResetCode(resetCode) {
      try {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{ resetCode });
        setMessage("Code verified successfully");
         navigate("/reset-password")
      } 
      catch (error) {
        setMessage("Invalid code. Try again");
      }
    }
  
    useEffect(() => {
      verifyResetCode(resetCode);
    }, [resetCode]);

    const handleVerify = (e) => {
      e.preventDefault();
      verifyResetCode(resetCode);
    };

  return (
    <div className="container h-[100vh] px-3">
      <h2 className="text-4xl my-5 font-semibold">Verify Reset Code</h2>
      <form className="relative z-0 w-full mb-5 group" onSubmit={handleVerify}>
        <div className="relative z-0 w-full my-10 group">
          <input
            type="number"
            placeholder="Code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
            className="mb-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          />

          <button
            type="submit"
            className="mt-8 text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Verify Code
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}
