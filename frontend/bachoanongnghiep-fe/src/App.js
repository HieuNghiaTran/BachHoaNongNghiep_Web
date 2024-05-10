import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import { RouterCustom, RouterAdmin } from './router';
import ScrollToTop from "./components/layout/scollToTop";
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SubmitContext } from "./context/submitContext";
import $ from "jquery";
function App() {
  const { submit, onSubmit, offSubmit } = useContext(SubmitContext);
  const sidebar = document.querySelector('.sidebar')
  const sidebar_container = document.querySelector('.sidebar-container')
  const btnSidebar = document.querySelector('.toogle_nav_wrapper')

  useEffect(() => {
    if (!sidebar || !btnSidebar) return;
    const handleMouseEnter = () => {
    
      if (window.pageYOffset > 300) {

        sidebar.classList.add('isShowSidebar');
        
      }
      if(sidebar_container){
       
        sidebar_container.classList.remove('d-none');
        sidebar_container.classList.add('isShowSidebar');
      
      }

    }
    const handleMouseLeave = () => {
      sidebar.classList.remove('isShowSidebar');
      if(sidebar_container){

        sidebar_container.classList.remove('isShowSidebar');
        sidebar_container.classList.add('d-none');

      }
    };


    sidebar.addEventListener("mouseenter", () => {
      btnSidebar.removeEventListener('mouseleave', handleMouseLeave)
    })
    sidebar.addEventListener("mouseleave", () => {
      handleMouseLeave()
    })

    btnSidebar.addEventListener('mouseenter', handleMouseEnter);
    btnSidebar.addEventListener('mouseleave', handleMouseLeave);
    if (window.pageYOffset < 300) { btnSidebar.removeEventListener('mouseenter', handleMouseEnter); }
    return () => {
      btnSidebar.removeEventListener('mouseenter', handleMouseEnter);
      btnSidebar.removeEventListener('mouseleave', handleMouseLeave);
    };

  },[document.body.scrollHeight] );
  useEffect(() => {
    const elements = document.querySelectorAll('main');
    if (submit) {
      elements.forEach(element => {
        element.classList.add('bg-darks');
      });
    } else {
      elements.forEach(element => {
        element.classList.remove('bg-darks');
      });
    }
  }, [submit]);



  



  return (


    <BrowserRouter>

      <ScrollToTop />
      <RouterCustom />
      <RouterAdmin />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        //pauseOnFocusLoss
        draggable
        //pauseOnHover
        theme="light"
      />

    </BrowserRouter>

  );
}


export default App;
