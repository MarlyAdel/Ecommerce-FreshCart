import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners';
import { cartContext } from '../../Context/CartContext';

export default function Checkout() {
   const [isCallingAPI, setIsCallingApI] = useState(false); 
   const[apiError,setApiError] = useState(null) 
   let { cashOnDelivery, onlinePayment } = useContext(cartContext);
   const [successMessage, setSuccessMessage] = useState("");
   let [isOnline, setIsOnline] = useState(false);


  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  //* Validation:
  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), 'Invalid Phone Number').required("Required"),
    city: Yup.string().required("Required"),
  });

  const shippingForm = useFormik({
    
    initialValues: initialValues, 

    validationSchema: validationSchema, 

    onSubmit: callPayment
  });

 //* Call Api:
 async function callPayment(values) { 
  console.log(isOnline)
   try {
    setIsCallingApI(true);
    setSuccessMessage("");
    if(isOnline){
      let x = await onlinePayment(values); 
      console.log(x);
      window.location.href = x.session.url
    }
    else{
      let x = await cashOnDelivery(values);  
      console.log(x);
      setSuccessMessage("✅ Your order is being processed and is now on its way! 🚚");
    }
    
    setApiError(null); 
    console.log(values);
    
   } 
   catch (error) {
    setApiError(error.response.data.message);
    setIsCallingApI(false);
   }
 }

  return (
    <div>
    
<form onSubmit={shippingForm.handleSubmit} className="w-1/2 my-4 mx-auto">
  <h1 className='text-3xl mb-3 text-gray-800'>Shipping Information : </h1>

  {apiError?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {apiError}
    </div> : ''}

  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="details" onBlur={shippingForm.handleBlur} value={shippingForm.values.email} onChange={shippingForm.handleChange} id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details:</label>
  
   {shippingForm.errors.details && shippingForm.touched.details?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {shippingForm.errors.details}
    </div> : ''}
  </div>
   <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" onBlur={shippingForm.handleBlur} value={shippingForm.values.email} onChange={shippingForm.handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
  
   {shippingForm.errors.phone && shippingForm.touched.phone?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {shippingForm.errors.phone}
    </div> : ''}
  </div>
   <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="city" onBlur={shippingForm.handleBlur} value={shippingForm.values.email} onChange={shippingForm.handleChange} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
    <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City:</label>
  
   {shippingForm.errors.city && shippingForm.touched.city?  <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       {shippingForm.errors.city}
    </div> : ''}
  </div>
  
   <div className="relative z-0 w-full mb-5 group">
    <input type="checkbox" value={"online"} onChange={() => setIsOnline(true)}/>
    <label htmlFor=""> Pay Online</label>
   </div>

  {isCallingAPI ? <div className=' w-auto flex justify-end'>
     <div className="bg-main p-2 rounded-md">
      <ClipLoader color='text-main' size={25}/>
     </div>
  </div> : <button type="submit" className=" text-white block ms-auto bg-main hover:bg-main hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay now</button>}
  
  
</form>

    </div>
  )
}
