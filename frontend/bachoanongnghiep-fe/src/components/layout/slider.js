import React from "react";
import Slider from "react-slick";


const Sliders = () => {

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      
      <div className="baner">
        <div className="slider_area">
        <Slider {...settings}>
          <div className="item">
            <img src="https://theme.hstatic.net/200000692099/1001033556/14/collection_main_banner.jpg?v=30" alt="" />
          </div>
          <div className="item">
            <img src="https://theme.hstatic.net/200000722083/1001109742/14/slider_1.jpg?v=22" alt="" />
          </div>
          <div className="item">
            <img src="https://theme.hstatic.net/200000722083/1001109742/14/slider_2.jpg?v=22" alt="" />
          </div>
          </Slider>
         </div>
         </div>

      
    </>
  );
};

export default Sliders;
