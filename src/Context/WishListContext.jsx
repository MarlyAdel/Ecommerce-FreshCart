import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const wishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  function updateToken() {
    const newToken = localStorage.getItem("userToken");
    setToken(newToken);
  }

  // const WISHLIST_API_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  // const headers = {
  //   token:localStorage.getItem('userToken')
  // };

 //^ To get products to the whislist
  async function getWishList() {
     if (!token) return;
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ headers: { token } });
      setWishlist([...data?.data]);  
     
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  //^ To add products to the whislist
  async function addToWishList(product){
    if (!token) return;
    try {
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId : product.id},{ headers: { token } });
      
      if (data.status == "success") {
        setWishlist((wish) => [...wish, product]);
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
     if (!token) return;
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{ headers: { token } });
       setWishlist((prev) => prev.filter((item) => item.id !== productId)); 
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
  }, [token]);

  return (
    <wishListContext.Provider value={{ wishlist, getWishList, addToWishList, removeFromWishList, isInWhishList, updateToken  }}>
      {props.children}
    </wishListContext.Provider>
  );
}
