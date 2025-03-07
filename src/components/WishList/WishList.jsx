import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import Loader from "../Shared/Loader/Loader";
import { Helmet } from "react-helmet";

export default function WishList() {
  const [loading, setLoading] = useState(null);
  
  let { wishlist, removeFromWishList } = useContext(wishListContext);
  const { addToCart } = useContext(cartContext);


  async function handleRemove(productId) {
    setLoading(productId); 
    await removeFromWishList(productId); 
    setLoading(null); 
  }

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId);
      toast("Product added successfully✌️" , {position:"top-right", theme:"dark" , type:"success"});
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart: " + message);
    }
  }

  

   return (
     <>
     <Helmet>
      <title>Wishlist</title>
     </Helmet>
       <div className="container h-full my-6 ml-2 md:ml-0">
         <h2 className="text-4xl font-bold my-6">My Wishlist ❤️❤️</h2>
         {wishlist ? (
           wishlist.length === 0 ? (
             <>
               <h1 className="text-center text-4xl py-32 font-medium">
                 Your wishlist is empty.
               </h1>
             </>
           ) : (
             <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
               {wishlist.map((product) => (
                 <div
                   key={product.id}
                   className="border p-4 rounded-lg shadow-lg relative"
                 >
                   {/* Product Image */}
                   <Link
                     to={`/productDetails/${product.id}/${product.category._id}`}
                   >
                     <img
                       src={product.imageCover}
                       alt={product.title}
                       className="w-full h-48 object-cover mb-2 rounded"
                     />
                   </Link>

                   {/* Product Details */}
                   <span className="text-main block">
                     {product.category.name}
                   </span>
                   <h3 className="font-semibold text-lg">
                     {product.title.split(" ").slice(0, 2).join(" ")}
                   </h3>
                   <div className="flex justify-between items-center mt-2">
                     <p className="font-bold">{product.price} EGP</p>
                     <p className="text-yellow-500">
                       <i className="fa fa-star"></i> {product.ratingsAverage}
                     </p>
                   </div>

                   {/* Remove From Wishlist Icon */}
                   <div className="flex justify-end pt-3">
                     {loading === product.id ? (
                       <span className="text-blue-600 font-medium">
                         Removing...
                       </span>
                     ) : (
                       <span
                         onClick={() => handleRemove(product.id)}
                         className="text-red-700 cursor-pointer"
                       >
                         <i className="fa-solid fa-trash text-red-700"></i>{" "}
                         Remove
                       </span>
                     )}
                   </div>

                   {/* Add to Cart Button */}
                   <button
                     onClick={() => handleAddToCart(product.id)}
                     className="btn bg-main w-full p-2 text-center text-white mt-3 rounded-md"
                   >
                     Add to Cart
                   </button>
                 </div>
               ))}
             </div>
           )
         ) : (
           <h1 className="text-3xl text-center py-8">Loading...</h1>
         )}
       </div>
     </>
   );

}
