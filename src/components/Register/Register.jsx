import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const[count, setCount] = useState(0)
  const [isCallingAPI, setIsCallingApI] = useState(false); 
  const[apiError,setApiError] = useState(null)

  let navigate = useNavigate() //programmatic routing

  const initialValues = {
    name: "",
    email: "",
    password: "",   
    rePassword: "",
    phone: "",
  };

  //* Validation:
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum length is 3 letters").max(15, "Miximum length is 15 letters").required("Required"),
    email: Yup.string().email('Invalid email').required("Required"),
    password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid Password It must starts with capital letter').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "The rePassword doesn't match the password").required("Required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), 'Invalid Phone Number').required("Required"),
  });

  const registerForm = useFormik({
    
    initialValues, 

    validationSchema, 


    onSubmit: callRegister
  });

 //* Call Api:
 async function callRegister(values) {

   try {
     setIsCallingApI(true) 
     setApiError(null) 
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
    console.log(data)
    setIsCallingApI(false) 
    //login
    navigate("/login")

   } catch (error) {
    setApiError(error.response.data.message);
    setIsCallingApI(false);
   }
 }

  return (
    <div>
    
<form onSubmit={registerForm.handleSubmit} className="w-1/2 my-4 mx-auto">
  <h1 className='text-3xl mb-3 text-gray-800'>Register Now : </h1>

  {apiError?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {apiError}
    </div> : ''}

  <div className="relative z-0 w-full mb-5 group">
    <input type="text" onBlur={registerForm.handleBlur} value={registerForm.values.name} onChange={registerForm.handleChange}  name="name" id="floating_name" className="mb-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
     
     {registerForm.errors.name && registerForm.touched.name?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {registerForm.errors.name}
    </div> : ''}

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
  
   {registerForm.errors.email && registerForm.touched.email?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {registerForm.errors.email}
    </div> : ''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
  
   {registerForm.errors.password && registerForm.touched.password? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {registerForm.errors.password}
    </div> : ''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} onChange={registerForm.handleChange} id="floating_rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password:</label>
  
   {registerForm.errors.rePassword && registerForm.touched.rePassword? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {registerForm.errors.rePassword}
    </div> : ''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" onBlur={registerForm.handleBlur} value={registerForm.values.phone} onChange={registerForm.handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
  
   {registerForm.errors.phone && registerForm.touched.phone? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {registerForm.errors.phone}
    </div> : ''}
  </div>

  {isCallingAPI ? <div className=' w-auto flex justify-end'>
     <div className="bg-main p-2 rounded-md">
      <ClipLoader color='text-main' size={25}/>
     </div>
  </div> : <button type="submit" className=" text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>}
  
  
</form>

    </div>
  )
}
