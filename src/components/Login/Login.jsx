import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { tokenContext } from '../../Context/tokenContext'
import { Helmet } from 'react-helmet'

export default function Login() {
    const[count, setCount] = useState(0)
    
    const [isCallingAPI, setIsCallingApI] = useState(false); 
    const[apiError,setApiError] = useState(null) 

    let{setToken} = useContext(tokenContext)

  let navigate = useNavigate() //programmatic routing

  const initialValues = {
    email: "",
    password: "",   
  };

  //* Validation:
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required("Required"),
    password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid Password').required("Required"),
  });

  const loginForm = useFormik({
    
    initialValues: initialValues, 

    validationSchema: validationSchema, 

    onSubmit: callLogin
  });

 //* Call Api:
 async function callLogin(values) {

   try {
     setIsCallingApI(true) 
     setApiError(null) 
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
    console.log(data)
    setIsCallingApI(false) 

    localStorage.setItem("userToken", data.token)
    setToken(data.token);
    
    navigate("/")

   } catch (error) {
    setApiError(error.response.data.message);
    setIsCallingApI(false);
   }
 }

  return (
    <> 
    <Helmet>
      <title>Login</title>
    </Helmet>
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={loginForm.handleSubmit}
          className="w-1/2 mb-52 pt-6 mx-auto"
        >
          <h1 className="text-3xl mb-6 text-gray-800">Login Now : </h1>

          {apiError ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : (
            ""
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email:
            </label>

            {loginForm.errors.email && loginForm.touched.email ? (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {loginForm.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password:
            </label>

            {loginForm.errors.password && loginForm.touched.password ? (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {loginForm.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          {isCallingAPI ? (
            <div className=" w-auto flex justify-end">
              <div className="bg-main p-2 rounded-md">
                <ClipLoader color="text-main" size={25} />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className=" text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}

          {/* Forgot Password */}

          <div className="mt-5">
            <Link to="/forgot-password" className="font-medium">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
