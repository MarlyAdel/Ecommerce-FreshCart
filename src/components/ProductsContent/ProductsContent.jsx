import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../Shared/ProductItem/ProductItem";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function ProductContent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); 
      });
  }, []);

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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
      />
      <div className="main-layout flex-auto">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loader />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              addProductToCart={addProductToCart}
            />
          ))
        ) : (
          <div className=" flex items-center justify-center w-full h-60 text-gray-600 font-medium text-xl">
            No results found 😢
          </div>
        )}
      </div>
    </div>
  );
}
