import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Shared/Loader/Loader";

export default function CategoriesContent() {
  const [categoies, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getCategories() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      console.log(data);
      setCategories(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-center my-8 ">
        {categoies.map((category) => (
          <div
            key={category._id}
            className=" p-2 gap-5 text-center border rounded-md hover:shadow-xl "
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[300px]  object-cover rounded-md"
            />
            <p className="my-5 text-2xl font-medium text-[#198754]">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
