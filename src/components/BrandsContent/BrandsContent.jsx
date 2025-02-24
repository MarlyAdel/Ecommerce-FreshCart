import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';

export default function BrandsContent() {
    const[brands, setBrands] = useState([]);
    const [error, setError] =useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [loading, setLoading] = useState(false);

   async function getBrands(){
     setLoading(true);
     try {
     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    //console.log(data)
    setBrands(data.data);
    setLoading(false);
    } 
    catch (error) {
    setError(error.message);
   }
   }

   useEffect(() => {
    getBrands();
   },[])

   if (loading) {
     return <Loader />
   }

  return (
    <div className="container h-full">
      <div className=" flex flex-wrap gap-5 text-center my-8 ml-12 md:ml-0">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className=" p-2 text-center border rounded-md transition-transform transform hover:scale-105 shadow-sm hover:shadow-xl cursor-pointer"
            onClick={() => setSelectedBrand(brand)}
          >
            <img src={brand.image} alt={brand.name} className="" />
            <p className="my-5">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-semibold">{selectedBrand.name}</h3>
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-black"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-48 h-32 mx-auto rounded-lg"
              />
              <p className="text-gray-600 mt-3 text-center">
                {selectedBrand.name}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t pt-3">
              <button
                onClick={() => setSelectedBrand(null)}
                className="px-4 py-2 bg-main text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
