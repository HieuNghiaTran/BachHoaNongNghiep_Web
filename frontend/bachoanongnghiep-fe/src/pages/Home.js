import Sidebar from "../components/layout/sidebar";
import Footer from "../components/layout/footer";
import Chat from "../components/layout/chat";
import Sliders from "../components/layout/slider";
import Header from "../components/layout/header";
import ListCatory from "../components/layout/listCatory";
import Products from "../components/layout/products";
import { useContext, useEffect, useState } from "react";
import { getAllProduct, getProductDetail, getProductWithCategoryPageginate, getProductWithCatory } from "../services/productSevices";
import './ccs/home.scss'
import { UserContext } from "../context/userContext";
import { HisProvider, historyContext } from "../context/historyContext";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import MetaData from "../services/setHead";
import ScrollToTop from "../components/layout/scollToTop";
import Slider from "react-slick";
import HotDeal from "../components/layout/hotDeals";
import AppChat from "../components/layout/appchat";


const HomePage = () => {
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [products4, setProducts4] = useState([]);
  const [products5, setProducts5] = useState([]);
  const { listHistory } = useContext(historyContext)

  useEffect(() => {
    fetchData();
    listHistory.push('Trang chủ')

  }, []);

  const fetchData = async () => {
    try {
      let res1 = await getProductWithCategoryPageginate(1, 6, "658d71c7bdf16aee6ce16344");
      setProducts1(res1.data.docs);

      let res2 = await getProductWithCategoryPageginate(1, 5, "658d7164bdf16aee6ce1633c");
      setProducts2(res2.data.docs);
      let res3 = await getProductWithCategoryPageginate(1, 5, "658d7170bdf16aee6ce1633e");
      setProducts3(res3.data.docs);
      let res4 = await getProductWithCategoryPageginate(1, 5, "658d7192bdf16aee6ce16342");
      setProducts4(res4.data.docs);
      let res5 = await getProductWithCategoryPageginate(1, 5, "658d7182bdf16aee6ce16340");
      setProducts5(res5.data.docs);


    } catch (err) {
      console.log(err);
    }
  };

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

    <div className='wrapper position-relative'>
       
      <MetaData title={"Trang chủ"}></MetaData>
      <Header />
      
      <main className="">
        <div className='top-main d-flex position-relative px-3'>
          <Sidebar />
          <Sliders />
          <div className="col-md-3 mx-3 mb-3" style={{ height: "100%" }}>
            <div className="row"> <Link to={"/trang-chu"} ><img className="mb-1 mt-1 w-100" src="https://theme.hstatic.net/1000269461/1000985512/14/bottom_banner_1_large.jpg?v=1678"></img></Link></div>
            <div className="row"> <Link to={"/trang-chu"}><img className="w-100" src="https://theme.hstatic.net/1000269461/1000985512/14/bottom_banner_3_large.jpg?v=1678"></img></Link></div>

          </div>
        </div>
        <ListCatory />

     
        <div><HotDeal/></div>
        <h4 className="sub-title">THUỐC BẢO VỆ THỰC VẬT</h4>

        <div className="tbvtv_are d-flex flex-wrap p-0">
          <div><Link><img src="//theme.hstatic.net/200000692099/1001033556/14/section_hot.jpg?v=30"></img></Link></div>
          {products1 && products1.length > 0 && products1.map((product) => (
            <Products key={product._id} product={product} col={2} />


          ))}
        </div>


        <div className=" d-flex justify-content-center align-item-center"><Link to="/collections/658d71c7bdf16aee6ce16344"><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
        <div className="text-center p-4" ><Link><img className="w-100" src={"https://theme.hstatic.net/200000722083/1001109742/14/section_hot_banner.png?v=22"}></img></Link></div>


        <h4 className="sub-title">GẠO</h4>
        <div className="tbvtv_are d-flex flex-wrap">
          <div><Link><img src="//theme.hstatic.net/200000692099/1001033556/14/section_hot.jpg?v=30"></img></Link></div>
          {products2 && products2.length > 0 && products2.map((product) => (
            <Products key={product._id} product={product} col={2} />


          ))}

        </div>
        <div className=" d-flex justify-content-center align-item-center"><Link to={"/collections/658d7164bdf16aee6ce1633c"}><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
        <h4 className="sub-title">PHÂN BÓN</h4>
        <div className="tbvtv_are d-flex flex-wrap">
          <div><Link><img src="https://theme.hstatic.net/200000692099/1001033556/14/banner_coll_1.jpg?v=30"></img></Link></div>
          {products3 && products3.length > 0 && products3.map((product) => (
            <Products key={product._id} product={product} col={2} />


          ))}

        </div>
        <div className=" d-flex justify-content-center align-item-center"><Link to={"/collections/658d7170bdf16aee6ce1633e"}><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
        <h4 className="sub-title">HẠT GIỐNG</h4>
        <div className="tbvtv_are d-flex flex-wrap">
          <div><Link><img src="https://theme.hstatic.net/200000692099/1001033556/14/banner_coll_3.jpg?v=30"></img></Link></div>
          {products4 && products4.length > 0 && products4.map((product) => (
            <Products key={product._id} product={product} col={2} />


          ))}

        </div>
        <div className=" d-flex justify-content-center align-item-center"><Link to={"/collections/658d7192bdf16aee6ce16342"}><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
        <h4 className="sub-title">LINK KIỆN DRONE</h4>
        <div className="tbvtv_are d-flex flex-wrap">
          <div><Link><img src="//theme.hstatic.net/200000692099/1001033556/14/section_hot.jpg?v=30"></img></Link></div>
          {products5 && products5.length > 0 && products5.map((product) => (
            <Products key={product._id} product={product} col={2} />


          ))}

        </div>
        <div className=" d-flex justify-content-center align-item-center"><Link to="/collections/658d7182bdf16aee6ce16340"><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
        <div>

          <h4 className="sub-title">ĐỐI TÁC CỦA CHÚNG TÔI</h4>
          <div className="px-5">

            <Slider {...settings}>


              <img className="w-80 h-80" src="https://theme.hstatic.net/200000722083/1001109742/14/brand_1.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_3.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_4.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_2.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_5.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_6.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_7.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_8.jpg?v=22"></img>
              <img src="https://theme.hstatic.net/200000722083/1001109742/14/brand_9.jpg?v=22"></img>

            </Slider>

          </div>


        </div>
        <ScrollToTop />
        <AppChat />
      
      </main>


      <Footer />


      
    </div>
  );
};

export default HomePage;
