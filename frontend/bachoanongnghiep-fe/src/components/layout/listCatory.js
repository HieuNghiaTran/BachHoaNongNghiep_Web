import Feedback from "react-bootstrap/esm/Feedback";
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";



const ListCatory = () => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };



    return (
        <div className="contain_catory_parent px-4">
           <div className="contain_catory">
           <div className="title_catory d-flex">
                <div className="icon-title"></div>
                <span className="h4 mx-2 my-auto py-1">DANH MỤC NỔI BẬT</span>
            </div>
            <Slider {...settings}>
                <div className="text-center slider-container">
                    <div className="circle"><img src={require("../images/Anvil.jpeg")} width="100px" height="100px" className="text-center img-catory mx-auto d-block rounded-circle" /></div>
                    <Link to="/collections/658d71c7bdf16aee6ce16344" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold" >THUỐC BẢO VỆ THỰC VẬT</Link>
                </div>

                <div className="text-center slider-container">
                <div className="circle"><img src={require("../images/phan-bon-da-trung-vi-luong-1.png")} width="100px" height="100px" className="img-catory mx-auto d-block rounded-circle" /></div>
                    <Link to="/collections/658d7170bdf16aee6ce1633e" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold">PHÂN BÓN</Link>
                </div>
                <div className="text-center slider-container">
                <div className="circle"><img src={require("../images/gao-anh-1629435457603409639437.jpg")} width="100px" height="100px" className="img-catory mx-auto d-block rounded-circle" /></div>
                    <Link to="/collections/658d7164bdf16aee6ce1633c" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold">GẠO</Link>
                </div>
                <div className="text-center slider-container">
                <div className="circle"><img src={"https://vuonbabylon.vn/wp-content/uploads/2020/12/Hat-giong-rau-muong-la-lon-rado.jpg"} width="100px" height="100px" className="img-catory mx-auto d-block rounded-circle" /></div>
                    <Link to="/collections/658d7192bdf16aee6ce16342" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold">HẠT GIỐNG</Link>
                </div>
                <div className="text-center slider-container">
                <div className="circle"><img src={require("../images/AGRAS-T40-2.webp")} width="100px" height="100px" className="mx-auto d-block rounded-circle" /></div>
                    <Link to="/collections/658d7182bdf16aee6ce16340" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold">LINH KIỆN DRONE</Link>
                </div>
                <div className="text-center slider-container">
                <div className="circle"> <img src={require("../images/The-Story-of-Todays-Successful-Young-Farmers-.jpg")} width="100px" height="100px" className="img-catory mx-auto d-block rounded-circle" /></div>
                    <Link to="/category/phan-bon" className="mt-3 d-flex justify-content-center align-item-center text-decoration-none fw-bold">BLOG NÔNG NGHIỆP</Link>
                </div>


            </Slider>
           </div>
        </div>




    );

}


export default ListCatory;