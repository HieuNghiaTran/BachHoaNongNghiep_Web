import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Styles.scss'
import ModalsLoginForm from "./ModalsLoginForm";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaSortDown } from "react-icons/fa";
import Search from "./search";
import { FaPhone } from "react-icons/fa6";
import Cart from "./cart";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import Sidebar from "./sidebar";



const Header = () => {
  const { user, logOut, jwt } = useContext(UserContext);
  const [isShowSideBar, setIsShowSideBar] = useState(false)
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const [pageScoll, setPageScoll] = useState()
  const [isShowHeader, setIsShowHeader] = useState(true);
  const [isShowModalsLogin, setIsShowModalLogin] = useState(false);
  const [sidebar, setSidebar] = useState()
  const [btnSidebar, setBtnSidebar] = useState()

  const btnsidebarRef = useRef(null);



  let [valueProgress, setValueProgress] = useState(0)





  const handleMouseEnter = () => {
    if (window.pageYOffset > 300) {


      if (sidebar) {

        sidebar.classList.add('isShowSidebar');
      }


    }


  }

  const handleMouseLeave = () => {

    if (sidebar) {
      sidebar.classList.remove('isShowSidebar');
    }
  };





  useEffect(() => {
    setBtnSidebar(btnsidebarRef.current);
  }, []);


  useEffect(() => {
     //setBtnSidebar(document.querySelector('.toogle_nav_wrapper'))
     setSidebar(document.querySelector('.sidebar'))

    window.addEventListener('scroll', handleScroll);



    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setPageScoll(window.pageYOffset)

    let pageHeight = document.body.scrollHeight;
    let scoll = window.pageYOffset;
    setValueProgress((scoll / pageHeight) * 100)

  };


  const handleClose = () => { setIsShowModalLogin(false) }
  const handleShow = () => {
    jwt && user
      ? (() => {
        setIsShowModalLogin(false);
        setIsShowDropDown(!isShowDropDown);
      })()
      : setIsShowModalLogin(true);


  }
  const handleSignOut = () => {
    logOut();
    alert("dang xuat thanh cong")
  }

  return (
    <>
      <div className={pageScoll > 300 ? " visible position-fixed w-100" : "sa"} style={{ zIndex: "100" }}  > <Navbar expand="md" className="bg-body-tertiary" >
        <div className="top_nav">
          <div className="left_loc col-md-3">
            <a href="#" className="logo">
              <Navbar.Brand href="/trang-chu" className="Brand">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  width="75%"

                />


              </Navbar.Brand>
            </a>
          </div>
          <div className="fill_loc">
            <Search />
          </div>
          <div className="right_loc" style={{ margin: "" }}>

            <ul className="icont_custom ">
              <li className="col-md-5 m-auto">
                <div className="phone_area d-flex ujstify-content-center align-item-center">
                  <img class="align-self-center mx-2" loading="lazy" src="//theme.hstatic.net/200000692099/1001033556/14/phone.png?v=30" width="27" alt="phone"></img>
                  <div className="d-md-flex flex-column">
                    <div style={{ fontSize: '0.85rem', color: "#3a445e" }}>Hỗ trợ khách hàng</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }} className="phone">055.9809.019</div>
                  </div>



                </div>
              </li>
              <li className="cus_li border-none m-auto">
                <div className="acount_name d-flex" onClick={handleShow}>
                  <span className="account-icon"><FaRegUserCircle /></span>
                  {jwt && user ?
                    <span className="Account mx-2">{user.username}</span> :
                    <span className="Account mx-2">
                      <div style={{ fontSize: '0.8rem', display: "inline-block" }}>Đăng nhập</div>
                      <div style={{ fontSize: '0.5rem', display: "inline-block" }}>Đăng ký</div>
                    </span>
                  }

                  <NavDropdown
                    showArrow={false}
                    show={isShowDropDown}
                    menuVariant="light"
                    className="nav-dropdown-no-arrow"
                    style={{ zIndex: '999', right: "3.5rem", top: "0.5rem" }}
                  >
                    <NavDropdown.Item href="#action/3.1">Thông tin tài khoản</NavDropdown.Item>
                    <NavDropdown.Item> <Link to={"/my-order"}>Đơn mua</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4" onClick={handleSignOut}>
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </li>

              <li className="m-auto">
                <Cart />
              </li>
            </ul>
          </div>
        </div>



      </Navbar><div className="under_nav">
          <div className="toogle_nav_wrapper p-0 mx-4">
            <button className="toogle_menu btn-outline-success" onMouseEnter={handleMouseEnter} ref={btnsidebarRef} style={{ width: "20rem" }} >
              <i className="fa-solid fa-bars"></i>
              <span>Danh mục sản phẩm</span>
            </button>

          </div>
          <ul className="col-3">
            <li className=""><a href="#"><i className="fa-solid fa-house"></i>Giới thiệu</a></li>
            <li><a href="#"><i className="fa-regular fa-newspaper"></i>Kỹ thuật</a></li>
            <li><a href="#"><i className="fa-solid fa-shop"></i>Kiểm tra đơn hàng</a></li>
            <li><Link to={"/page/location"}><i className="fa-solid fa-location-dot fa-flip"></i>Hệ thống cửa hàng </Link></li>
            <li><a href="#"><i className="fa-solid fa-phone"></i>Liên hệ</a></li>

          </ul>
        </div>
        <ProgressBar completed={valueProgress.toFixed(2)} bgColor="#ff3f34" height="3px" width="100vw" isLabelVisible={false} />
      </div>
      <ModalsLoginForm
        show={isShowModalsLogin}
        handleClose={handleClose}


      />


    </>


  );
}

export default Header;
