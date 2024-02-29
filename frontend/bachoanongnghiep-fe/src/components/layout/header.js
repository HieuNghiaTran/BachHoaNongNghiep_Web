import React, { useState } from "react";
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


const Header = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)

  function toggleSidebar() {
    const toogle_menu = document.querySelector('.toogle_menu');
    const sidebar = document.querySelector('.sidebar');
    toogle_menu.removeEventListener('click', handleToggle);
    toogle_menu.addEventListener('click', handleToggle);
  
    function handleToggle() {
      setIsShowSideBar(!isShowSideBar);
    }
  
    if (isShowSideBar) {
      sidebar.style.display = 'block';
    } else {
      sidebar.style.display = 'none';
    }
  }



  const [isShowModalsLogin, setIsShowModalLogin] = useState(false);
  const handleClose = () => { setIsShowModalLogin(false) }
  const handleShow = () => { 
    
    setIsShowModalLogin(true) }
  return (
    <><Navbar expand="lg" className="bg-body-tertiary">
      <div className="left_loc">
        <a href="#" className="logo">
          <Navbar.Brand href="#home" className="Brand">Bách Hoá Nông Nghiệp</Navbar.Brand>
        </a>
      </div>
      <div className="fill_loc">
        <div className="search_bar">
          <input type="text" className="search_loc" placeholder="Tìm kiếm sản phẩm" />

          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div className="right_loc">
        <ul className="icont_custom">
          <li className="cus_li">
            <div className="acount_name">
              <a  onClick={handleShow}>Tài Khoản</a> <br />
              <a onClick={handleShow}>Đăng nhập</a>
            </div>

            <button className="custom_icont">
              <img src={"https://theme.hstatic.net/200000722083/1001109742/14/account-icon.png?v=22"} alt="" width="35px" height="35px" />
              <NavDropdown title="Acount" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Thông tin tài khoản</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Đơn mua
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Đăng xuất</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </button>
          </li>
          <li>
            <button className="btn_cart">

              <img src={require("../images/cart-icon-transparent-18.jpg")} alt="" width="55px" height="55px" />
              <div className="total_product_cart">11</div>
            </button>
          </li>
          <li>
            <button className="btn_bell">
              <img src={"https://cdn1.concung.com/themes/desktop4.1/image/v40/icon/notify-top.png"} alt="" width="35px" height="35px" />
              <div className="total_notify">12</div>
            </button>
          </li>

        </ul>
      </div>
     



    </Navbar><div className="under_nav">
        <div className="toogle_nav_wrapper  mr-2  p-0 d-inline-flex">
          <button className="toogle_menu" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
            <span>Danh mục sản phẩm</span>
          </button>

        </div>
        <ul>
          <li><a href="#"><i className="fa-solid fa-house"></i>Giới thiệu</a></li>
          <li><a href="#"><i className="fa-regular fa-newspaper"></i>Kỹ thuật</a></li>
          <li><a href="#"><i className="fa-solid fa-shop"></i>Kiểm tra đơn hàng</a></li>
          <li><a href="#"><i className="fa-solid fa-location-dot fa-flip"></i>Hệ thống cửa hàng</a></li>
          <li><a href="#"><i className="fa-solid fa-phone"></i>Liên hệ</a></li>
        </ul>
      </div>

      <ModalsLoginForm
        show={isShowModalsLogin}
        handleClose={handleClose}


      />


    </>


  );
}

export default Header;
