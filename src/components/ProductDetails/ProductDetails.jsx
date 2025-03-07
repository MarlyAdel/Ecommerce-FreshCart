import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './components/RelatedProduct/RelatedProduct'
import Slider from 'react-slick'
import Loader from '../Shared/Loader/Loader'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import { wishListContext } from '../../Context/WishListContext'
import { Helmet } from 'react-helmet'



export default function ProductDetails() {
    const[count, setCount] = useState(0)
    const[details, setDetails] = useState(null)

    const {id,categoryId} = useParams()
    //console.log(id);

    let {addToCart} = useContext(cartContext);
    let { addToWishList, removeFromWishList, isInWhishList } = useContext(wishListContext);

    const settings = {
      dots: true, 
      infinite: true, 
      speed: 500, 
      slidesToShow: 1, 
      slidesToScroll: 1, 
    };

    const handleWishlistClick = () => {
      if (isInWhishList(id)) {
        removeFromWishList(id);
      } else {
        addToWishList(details);
        
      }
    };

    function getProductDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data}) => {
        //console.log(data)
        setDetails(data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    async function addProductToCart(id) {
      try {
        let data = await addToCart(id);
      if (data.status == "success") {
        toast("Product added successfully✌️" , {position:"bottom-right", theme:"dark" , type:"success"}); 
      }
      else {
        toast.error("Failed to add product to cart: " + data.message); 
      }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getProductDetails();
    },[id])

  return (
    <>
      <Helmet>
        <title>{details?.title}</title>
      </Helmet>
      {details && (
        <div className="main-layout container mx-auto items-center py-10 overflow-hidden">
          <div className="w-full md:w-4/12">
            <Slider {...settings}>
              {details?.images.map((src) => (
                <img src={src} alt="ItemImage" />
              ))}
            </Slider>
          </div>
          <div className=" md:w-8/12 mt-8 ml-1 md:ml-0">
            <h1 className="text-main">{details?.title}</h1>
            <p>{details?.description}</p>
            <span>{details?.category.name}</span>
            <div className="flex justify-between mb-3">
              <p>{details?.price} EGP</p>
              <p>
                <i className="fa fa-star rating-color"></i>
                {details?.ratingsAverage}
              </p>
            </div>
            <div className="flex">
              <button
                onClick={() => addProductToCart(details.id)}
                className="bg-main text-white w-10/12 p-2 rounded-md"
              >
                Add to Cart
              </button>
              <i
                className={`fa-heart text-2xl p-2 rounded-md ms-10 cursor-pointer ${
                  isInWhishList(id)
                    ? "fa-solid text-red-500"
                    : "fa-regular text-black"
                }`}
                onClick={handleWishlistClick}
              ></i>
            </div>
          </div>
        </div>
      )}

      {!details && <Loader />}

      <h2 className="container text-3xl font-bold mb-9">Related Products :</h2>

      <RelatedProduct categoryId={categoryId} currentProductId={id} />
    </>
  );
}
