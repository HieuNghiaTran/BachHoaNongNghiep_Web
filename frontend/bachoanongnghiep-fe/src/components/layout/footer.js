import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../Css/Styles.scss'
const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
     
        <br/>
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">

                <div className="single-footer about">
                  <div className="logo">
                  
                  </div>
                  <p className="text">Website bán hàng trực tuyến của Bách Hoá Nông Nghiệp, hỗ trợ 24/7 cùng nhiều ưu đẫi hấp dẫn. Luôn luôn cập nhật mới nhiều sản phẩm.</p>
                  <p className="text">Cần hỗ trợ liên hệ với chúng tôi: <span><a href="tel:123456789">+0123 456 789</a></span></p>
                </div>
               
              </div>
              <div className="col-lg-2 col-md-6 col-12">
              
                <div className="single-footer as">
                  <h4>Thông tin</h4>
                  <ul>
                    <li><a to=''>Về chúng tôi</a></li>
                    <li><a to=''>Điều khoản và điều kiện</a></li>
                    <li><a to=''>Liên hệ với chúng tôi</a></li>
                    <li><a to=''>Giúp đỡ</a></li>
                  </ul>
                </div>
              
              </div>
              <div className="col-lg-2 col-md-6 col-12">
              
                <div className="single-footer as">
                  <h4>Dịch vụ khách hàng</h4>
                  <ul>
                    <li><a to=''>Phương thức thanh toán</a></li>
                    <li><a to=''>Hoàn tiền</a></li>
                    <li><a to=''>Giao hàng</a></li>
                    <li><a to=''>Điều khoản và bảo mật</a></li>
                  </ul>
                </div>
              
              </div>
              <div className="col-lg-3 col-md-6 col-12">
               
                <div className="single-footer social">
                  <h4>Thông tin</h4>
                
                  <div className="contact">
                    <ul>
                      <li>Thị trấn An Châu_Châu Thành_An Giang</li>
                      <li>Trần Hiếu Nghĩa</li>
                      <li>info@tltore.com</li>
                      <li>+012 3456 7890</li>
                    </ul>
                  </div>
                
                  <ul>
                  </ul>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="text-center">
                    <p>Copyright © 2022 By Trần Hiếu Nghĩa</p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="right">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
