import { useEffect, useState } from "react";


const Sidebar = () => {


    //const btnSidebar = document.querySelector('.toogle_nav_wrapper')
    const sidebar = document.querySelector('.sidebar')
    const [btnSidebar, setBtnSidebar] = useState(null);
    useEffect(() => {
       
        const btn = document.querySelector('.toogle_nav_wrapper');
        setBtnSidebar(btn); 
    }, []);

      const handleMouseEnter = () => {
        if (window.pageYOffset > 300) {
  
          sidebar.classList.add('isShowSidebar');
         
  
        }
  
  
      }
  
      const handleMouseLeave = () => {
        sidebar.classList.remove('isShowSidebar');
      };
  


    return (

        <>
            <div className="sidebar mx-2" onMouseLeave={handleMouseLeave} onMouseEnter={()=>{btnSidebar.removeEventListener('mouseleave', handleMouseLeave)}}  >
                <ul className="" style={{width:"20rem"}}>
                    <li>
                        <a href="#">
                            <img src=" https://theme.hstatic.net/200000722083/1001109742/14/menu_icon_1.png?v=22" width="27px" height="27px"></img>
                            <span>Dọn Kho _ Giá Sốc</span>
                        </a>

                    </li>
                    <li><a href="#">
                        <img src="//theme.hstatic.net/200000722083/1001109742/14/menu_icon_4.png?v=22" width="22px" height="22px"></img>
                        <span>Thuốc bảo vệ thực vật</span>

                    </a>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li><a href="#">
                        <img src="//theme.hstatic.net/200000722083/1001109742/14/menu_icon_3.png?v=22" width="22px" height="22px"></img>
                        <span>Phân bón</span>
                    </a>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li><a href="#"><i className="fa-solid fa-bowl-rice"></i><span>Gạo</span></a>
                        <i className="fa-solid fa-chevron-right"></i></li>
                    <li>
                        <a href="#">
                            <i className="fa-solid fa-seedling"></i>
                            <span>Hạt giống</span>
                        </a>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li><a href="#">

                        <i className="fa-solid fa-wrench"></i>

                        <span>Linh kiện Drone</span>
                    </a>
                        <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li>
                        <a href="#">
                            <span>Giá lúa hôm nay</span>

                        </a>

                    </li>
                </ul>


            </div>

        </>


    );


}

export default Sidebar 