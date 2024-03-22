import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import { RouterCustom, RouterAdmin } from './router';
import ScrollToTop from "./components/layout/scollToTop";
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useRef } from 'react';

import socketIOClient from "socket.io-client";

function App() {
  
  try {
    const socket = socketIOClient("http://localhost:8001");
  } catch (err) {
    console.log(err)

  }

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
