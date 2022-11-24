import React from 'react';
import slider1 from '../Assets/slider/1.jpg';
import slider2 from '../Assets/slider/2.jpg';
import slider3 from '../Assets/slider/3.jpg';
import slider4 from '../Assets/slider/4.jpg';
import slider5 from '../Assets/slider/5.png';
import slider6 from '../Assets/slider/6.png';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './Slider.css';

import { Pagination } from "swiper";
const Slider = () => {
    return (
        <div className='-z-50'>
            <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
              <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider2} alt="" />
            </SwiperSlide>
        <SwiperSlide>
            <img src={slider3} alt="" />
            </SwiperSlide>
        <SwiperSlide>
            <img src={slider4} alt="" />
            </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Slider;