import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './PopularCategories.module.css'
import axios from 'axios'
import Slider from 'react-slick'

export default function PopularCategories() {
    const[count, setCount] = useState(0);
    const[categories, setCategories] = useState([]);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ], 
    };

    async function getCategories() {
      try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        //console.log(data);
        setCategories(data.data)
     }
     catch (error) {
        console.log(error)
     }
    }

    useEffect(() => {
      getCategories()
    },[])

  return (
    <div className='container py-8'>
      <h1 className='mb-1 text-xl'>Shop Popular Categories</h1>
       <Slider {...settings}>
            {categories.map(category =>  <div className='text-center'>
              <img src={category.image} alt="ItemImage" className={styles.cateoryImage}/>
              <h4>{category.name}</h4>
            </div>)}
          </Slider>
    </div>
  )
}
