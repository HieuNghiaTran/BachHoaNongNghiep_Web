import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Sidebar = () => {

    const sidebar = document.querySelector('.sidebar')
    const [btnSidebar, setBtnSidebar] = useState(null);
    useEffect(() => {

        const btn = document.querySelector('.toogle_nav_wrapper');
        setBtnSidebar(btn);
    }, []);

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



    return (

        <>
            <div className="sidebar mx-2" onMouseLeave={handleMouseLeave} onMouseEnter={() => { if (sidebar) { btnSidebar.removeEventListener('mouseleave', handleMouseLeave) } }}  >
                <ul className="" style={{ width: "20rem", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: "7px" }} >
                    <li>
                        <Link to={"/trang-chu"}>
                            <img src=" https://theme.hstatic.net/200000722083/1001109742/14/menu_icon_1.png?v=22" width="27px" height="27px"></img>
                            <span>Dọn Kho _ Giá Sốc</span>
                        </Link>

                    </li>
                    <li>

                        <Link to={"/collections/658d71c7bdf16aee6ce16344"}>
                            <img src="//theme.hstatic.net/200000722083/1001109742/14/menu_icon_4.png?v=22" width="22px" height="22px"></img>
                            <span>Thuốc bảo vệ thực vật</span>

                        </Link>
                        <i className="fa-solid fa-chevron-right"></i>

                    </li>
                    <li> <Link to={"/collections/658d7170bdf16aee6ce1633e"}>
                        <img src="//theme.hstatic.net/200000722083/1001109742/14/menu_icon_3.png?v=22" width="22px" height="22px"></img>
                        <span>Phân bón</span>
                    </Link>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li><Link to="/collections/658d7164bdf16aee6ce1633c">
                        <i className="fa-solid fa-bowl-rice"></i><span>Gạo</span>

                    </Link>
                        <i className="fa-solid fa-chevron-right"></i></li>
                    <li>
                        <Link to={"/collections/658d7192bdf16aee6ce16342"}>
                            <i className="fa-solid fa-seedling"></i>
                            <span>Hạt giống</span>
                        </Link>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li><Link to={"/collections/658d7182bdf16aee6ce16340"}>

                        <i className="fa-solid fa-wrench"></i>

                        <span>Linh kiện Drone</span>
                    </Link>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li>
                  
                        <Link>
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                            <span>Giá lúa hôm nay</span>

                        </Link>

                    </li>
                    <li><Link to={""}>

                    <i class="fa-solid fa-plus"></i>

                        <span className="mx-2">Blog nông nghiệp</span>
                    </Link>
                    
                    </li>
                </ul>


            </div>

        </>


    );


}

export default Sidebar 