import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">

            <div class="bg-light text-center ">
                <div className=''> 
                
                <img src={require("../components/images/logo.png")} alt="..."
                     class="img-thumbnail shadow-sm" />
                    <h3 class="mt-2">Admin</h3>
                    <p class="btn btn-primary font-weight-light btn-sm" id="generate">Generate Data</p></div>
            </div>
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="admin/dashboard"><MdDashboard /><span className='mx-2'> Tổng quan</span></Link>
                    </li>
                    <li>
                        <Link to="/admin/products">  <i class="fa fa-th-large mr-1 text-primary fa-fw"></i> Quản lý sản phẩm</Link>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Quản lý đơn hàng</Link>
                    </li>


                </ul>
            </nav>





        </div>
    )
}

export default Sidebar
