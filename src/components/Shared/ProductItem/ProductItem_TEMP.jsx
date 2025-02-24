import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { wishListContext } from "../../../Context/WishListContext";

export default function ProductItem(props) {
  const [count, setCount] = useState(0);

  let { imageCover, title, category, price, ratingsAverage, id } =
    props.product;

  let {addToWishList, removeFromWishList, isInWhishList } = useContext(wishListContext)  ;
  
  const handleWishlistClick = () => {
    if (isInWhishList(id)) {
      removeFromWishList(id);
    } else {
      addToWishList(props.product);
    }
  };

  return (
    <>
      <div className="md:w-1/2 lg:w-1/6 px-3 my-5">
        <div className="product">
          <Link to={`/productDetails/${id}/${category._id}`}>
            <div className="relative">
              <img src={imageCover} className="mb-2" alt="" />
              <i
                className={`fa-heart absolute top-1 right-2.5 text-2xl p-1 rounded-md ms-10 cursor-pointer mt-5 ${
                  isInWhishList(id)
                    ? "fa-solid text-red-500"
                    : "fa-regular text-white bg-black bg-opacity-20"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleWishlistClick();
                }}
              ></i>
            </div>
            <span className="text-main">{category.name}</span>
            <h2 className="mb-4 font-medium">
              {title.split(" ").splice(0, 2).join(" ")}
            </h2>

            <div className="flex justify-between mb-3">
              <p>{price} EGP</p>
              <p>
                <i className="fa fa-star rating-color"></i>
                {ratingsAverage}
              </p>
            </div>
          </Link>
          {!props.hideAddToCart && (
            <button
              onClick={() => props.addProductToCart(id)}
              className="btn bg-main w-full p-2 text-center text-white mt-1 rounded-md"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
