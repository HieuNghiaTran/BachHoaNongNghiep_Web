import React from "react";
import Carousel from 'react-bootstrap/Carousel';



const Sliders = () => {


  return (
    <>

      <div className="baner m-0 h-100 position-relative" style={{borderRadius:"15px"}}>
        <div className="slider_area">
          <Carousel data-bs-theme="light">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://theme.hstatic.net/200000722083/1001109742/14/slider_3.jpg?v=22"
                alt="First slide"
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://theme.hstatic.net/200000722083/1001109742/14/slider_1.jpg?v=22"
                alt="Second slide"
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://theme.hstatic.net/200000722083/1001109742/14/slider_2.jpg?v=22"
                alt="Third slide"
              />

            </Carousel.Item>
          </Carousel>
        </div>
      </div>


    </>
  );
};

export default Sliders;
