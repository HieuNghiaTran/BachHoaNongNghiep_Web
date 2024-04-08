import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import { RouterCustom, RouterAdmin } from './router';
import ScrollToTop from "./components/layout/scollToTop";
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import { SubmitContext } from "./context/submitContext";

function App() {
  const { submit, onSubmit, offSubmit } = useContext(SubmitContext);




  useEffect(() => {

    const sidebar = document.querySelector('.sidebar')
    const btnSidebar = document.querySelector('.toogle_nav_wrapper')
    if (!sidebar || !btnSidebar) return;
    const handleMouseEnter = () => {
      if (window.pageYOffset > 300) {

        sidebar.classList.add('isShowSidebar');
       

      }


    }

    const handleMouseLeave = () => {
      sidebar.classList.remove('isShowSidebar');
    };


    sidebar.addEventListener("mouseenter", () => {
      btnSidebar.removeEventListener('mouseleave', handleMouseLeave)
    })
    sidebar.addEventListener("mouseleave", () => {
      handleMouseLeave()
    })

    btnSidebar.addEventListener('mouseenter', handleMouseEnter);
    btnSidebar.addEventListener('mouseleave', handleMouseLeave);
    if (window.pageYOffset < 300) {  btnSidebar.removeEventListener('mouseenter', handleMouseEnter);}
    return () => {
      btnSidebar.removeEventListener('mouseenter', handleMouseEnter);
      btnSidebar.removeEventListener('mouseleave', handleMouseLeave);
  };

  },[]);
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
