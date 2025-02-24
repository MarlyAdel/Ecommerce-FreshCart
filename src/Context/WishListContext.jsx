import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const wishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  


  // const WISHLIST_API_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = {
    token:localStorage.getItem('userToken')
  };

 //^ To get products to the whislist
  async function getWishList() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ headers });
      setWishlist(data?.data || []);
     
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  //^ To add products to the whislist
  async function addToWishList(product){
    try {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId : product.id},{ headers });
      
      if (data.status == "success") {
        setWishlist([...wishlist, product]);
        toast("It has been successfully added❤️" , {position:"bottom-right", theme:"dark" , type:"success"}); 
      }
      else {
        toast.error("Failed to add product to cart: " + data.message); 
      }
    } 
    catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  //^Remove product from wishlist
  async function removeFromWishList(productId){
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{ headers });
      let deletedProduct = wishlist.filter((item) => item.id !== productId);
      setWishlist(deletedProduct);
    } 
    catch (error) {
       console.error("Error adding to wishlist:", error);
    }
  }

  function isInWhishList (productId){
    return wishlist.some((item) => item.id == productId)
  }

  useEffect(() => {
    getWishList();
  },[])

  return (
    <wishListContext.Provider value={{ wishlist, getWishList, addToWishList, removeFromWishList, isInWhishList }}>
      {props.children}
    </wishListContext.Provider>
  );
}
