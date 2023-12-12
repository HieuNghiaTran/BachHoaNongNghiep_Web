import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../Css/Styles.scss'

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div className="left_loc">
        <a href="#" className="logo">
        <Navbar.Brand href="#home" className="Brand">Bách Hoá Nônng Nghiệp</Navbar.Brand>
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
          <li>
            <div className="phone_contact">
              <i className="fa-solid fa-phone fa-beat"></i>
              Liên hệ mua hàng<br />
              0365257531
            </div>
          </li>
          <li>
            <button className="btn_cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <img src="./Source/cart-icon-transparent-18.jpg" alt="" width="40px" height="40px" />
              <div className="total_product_cart">11</div>
            </button>
          </li>
          <li>
            <button className="btn_bell">
              <i className="fa-regular fa-bell fa-shake"></i>
            </button>
          </li>
          <li className="cus_li">
            <div className="acount_name">Hieu Nghia</div>
            <button className="custom_icont">
              <img src="./user.png" alt="" width="40px" height="40px" />
            </button>
          </li>
        </ul>
      </div>
    </Navbar>
  );
}

export default Header;
