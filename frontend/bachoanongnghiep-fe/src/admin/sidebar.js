import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { AuthContext } from './context/authContext';
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";

const Sidebar = () => {
    const [admin, setAdmin] = useState('')
    const { user, logOut } = useContext(AuthContext)
    const [isHaveMes, setIsHaveMes]=useState(false)
    const ENDPOINT = "http://localhost:8001";
    const socketRef = useRef();
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [id, setId] = useState('')

    const [value, setValue] = useState("");

    const handleValueChange = (e) => {
        setValue(e.target.value);
        console.log(value)
    };



    




useEffect(()=>{

    if (user){

        setAdmin(user.email)
        
        }


},[user])

const handleLogout=()=>{
    logOut();

}





    return (
        <div className="sidebar-wrapper h-100">

            <div class="bg-light text-center ">
                <div className=''>

                    <img src={require("../components/images/logo.png")} alt="..."
                        class="img-thumbnail shadow-sm" />
                    <p class="mt-2">Xin chào, <span style={{color:"#be2edd" ,fontWeight:"bold"}}>{admin}</span></p>
                    <p class="btn btn-danger font-weight-light btn-sm" onClick={handleLogout} >Đăng xuất</p></div>
            </div>
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard"><MdDashboard /><span className='mx-2'> Tổng quan</span></Link>
                    </li>
                    <li>
                        <Link to="/admin/products"> <LuPackageOpen style={{marginRight:"0.5rem"}} /> Quản lý sản phẩm</Link>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Quản lý đơn hàng</Link>
                    </li>


                    <li>
                        <Link to="/admin/chat"><MdOutlineMarkUnreadChatAlt  style={{marginRight:"1rem"}}/>Chat</Link>
                    </li>


                </ul>
            </nav>





        </div>
    )
}

export default Sidebar
