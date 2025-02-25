import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


export default function SharedModel({selectedItems, closeModel}) {
    const[count, setCount] = useState(0)
  return (
    <div className="bg-[rgba(0,0,0,0.5)] fixed inset-0 flex items-center justify-center p-4">
      <div className="content bg-white rounded-md p-5 relative max-h-[80vh] w-full max-w-lg sm:max-w-2xl overflow-y-auto overflow-x-hidden">
        <i
          onClick={closeModel}
          className="fa fa-close text-2xl absolute right-4 top-4 cursor-pointer"
        ></i>
        <div className="space-y-4">
          {selectedItems.map((product) => (
            <div
              key={product.product._id}
              className="bg-[#E2E2E2] shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center"
            >
              <img
                src={product.product.imageCover}
                className="w-32 sm:w-48 h-auto rounded-md"
                alt={product.product.title}
              />
              <div className="flex-1 text-center sm:text-left sm:ml-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.product.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  Quantity: {product.count}
                </p>
                <p className="text-gray-900 font-semibold">EGP {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
