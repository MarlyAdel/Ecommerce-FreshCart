import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";



export const cartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const { token } = useContext(tokenContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState("");

  

  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;
  const headers = {
    token,
  };

 

  useEffect(() => {
    token && getCart();
  }, [token]);

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      //console.log(data)
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
        getCart();
      }
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to add product" };
    }
  }
  

  //^the cart data
  async function getCart() {
    try {
      const { data } = await axios.get(API_URL, { headers });
      //console.log(data);
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      setCartId(data.cartId);
      setCartDetails(data);
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to add product" };
    }
  }

  //^ To delete from cart
  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`, { headers });
      //console.log(data)
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      setCartDetails(data);
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to add product" };
    }
  }

  //^ To Update cart products quantity
  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        { count },
        { headers }
      );
      //console.log(data)
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
      }
      setCartDetails(data);
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to add product" };
    }
  }

  //^ Cash Checkout
  async function cashOnDelivery(shippingAddress) {
    try {
      const { data } = await axios.post(
        `${ORDER_API_URL}/${cartId}`,
        { shippingAddress },
        { headers }
      );
      //console.log(data)
      if (data.status == "success") {
        getCart();
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //^ Online Checkout
  async function onlinePayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //^ AllOrders
  async function getUserOrder(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //^ To Clear All the Cart
  async function clearCart() {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      if (data.status == "success") {
        setNumOfCartItems(0);
        setCartDetails(null);
      }
      await getCart();
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to clear cart" };
    }
  }

  

  useEffect(() => {
    getCart();
  }, [numOfCartItems]);
  
  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeProduct,
        updateCount,
        cashOnDelivery,
        onlinePayment,
        getUserOrder,
        clearCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

