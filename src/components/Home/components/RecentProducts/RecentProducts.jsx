import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { cartContext } from "../../../../Context/CartContext";
import { toast } from "react-toastify";
import { theme } from "flowbite-react";

export default function RecentProducts() {
  let [products, setProducts] = useState([]);

  let { addToCart } = useContext(cartContext);

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        //console.log(data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addProductToCart(id) {
    try {
      let data = await addToCart(id);
      //console.log(data);
      if (data.status == "success") {
        toast("Product added successfully✌️", {
          position: "bottom-right",
          theme: "dark",
          type: "success",
        });
      } else {
        toast.error("Failed to add product to cart: " + data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="main-layout container flex-auto">
        {products.length != 0 &&
          products.map((product) => (
            <ProductItem
              key={product.id}
              addProductToCart={addProductToCart}
              product={product}
            />
          ))}
      </div>

      {products.length == 0 && <Loader />}
    </>
  );
}
