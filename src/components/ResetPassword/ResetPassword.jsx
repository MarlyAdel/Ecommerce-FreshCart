import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    async function resetPassword(email,newPassword){
      try {
       await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` ,{email, newPassword} )
        
        setMessage("Password reset successfully");
        navigate("/login")
      } 
      catch (error) {
        setMessage("Error resetting password.");
      }
    }

    useEffect(() => {
      if (email && newPassword) {
        resetPassword(email, newPassword);
      }
    }, [email, newPassword]); 

   const handleReset = (e) => {
     e.preventDefault();
     resetPassword(email, newPassword);

   };

  return (
    <div className="container h-[100vh] px-3">
      <h2 className="text-4xl my-5 font-semibold">Reset New Password</h2>
      <form className="relative z-0 w-full mb-5 group" onSubmit={handleReset}>
        <div className="relative z-0 w-full my-10 group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-11 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mb-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          />

          <button
            type="submit"
            className="mt-8 text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Password
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}
