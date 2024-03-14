import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { AuthContext } from './context/authContext';

const Sidebar = () => {
    const [admin, setAdmin] = useState('')
    const { user, logOut } = useContext(AuthContext)

useEffect(()=>{

    if (user){

        setAdmin(user.email)
        
        }


},[user])
const handleLogout=()=>{
    logOut();

}

    return (
        <div className="sidebar-wrapper">

            <div class="bg-light text-center ">
                <div className=''>

                    <img src={require("../components/images/logo.png")} alt="..."
                        class="img-thumbnail shadow-sm" />
                    <h5 class="mt-2">Xin chào, {admin}</h5>
                    <p class="btn btn-danger font-weight-light btn-sm" onClick={handleLogout} >Đăng xuất</p></div>
            </div>
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard"><MdDashboard /><span className='mx-2'> Tổng quan</span></Link>
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
