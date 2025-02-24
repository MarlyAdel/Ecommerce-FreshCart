import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import silde1 from "../../../../assets/Images/slider-image-3.jpeg";
import silde2 from "../../../../assets/Images/slider-image-2.jpeg";
import silde3 from "../../../../assets/Images/slider-image-1.jpeg";
import static1 from "../../../../assets/Images/grocery-banner.png";
import static2 from "../../../../assets/Images/grocery-banner-2.jpeg";
import  Slider  from 'react-slick';



export default function StaticSlider() {
    const[count, setCount] = useState(0)

     const settings = {
       dots: true,
       infinite: true,
       speed: 500,
       arrows: false,
       slidesToShow: 1,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed: 3000, 
       responsive: [
         {
           breakpoint: 1024, 
           settings: {
             slidesToShow: 1,
           },
         },
         {
           breakpoint: 768, 
           settings: {
             slidesToShow: 1,
             dots: false, 
           },
         },
         {
           breakpoint: 480, 
           settings: {
             slidesToShow: 1,
             arrows: false,
             dots: false,
           },
         },
       ],
     };

  return (
   <div className="container mx-auto px-4 pt-5">
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="lg:w-9/12 w-full">
          <Slider {...settings}>
            <img src={silde2} className="h-[400px] w-full object-cover rounded-lg" alt="slide" />
            <img src={silde1} className="h-[400px] w-full object-cover  rounded-lg" alt="slide" />
            <img src={silde3} className="h-[400px] w-full object-cover rounded-lg" alt="slide" />
          </Slider>
        </div>

        <div className="lg:w-3/12 w-full flex flex-col gap-4">
          <img src={static1} className="h-[192px] w-full object-cover rounded-lg" alt="static" />
          <img src={static2} className="h-[192px] w-full object-cover rounded-lg" alt="static" />
        </div>
      </div>
    </div>
  );
}
