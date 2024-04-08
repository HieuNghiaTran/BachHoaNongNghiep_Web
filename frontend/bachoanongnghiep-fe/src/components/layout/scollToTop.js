import React, { useEffect, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { BackTop } from "antd";


function ScrollToTop(props) {
  const [heightPage, setHeightPage] = useState(0);
  const handleScroll = () => {
    setHeightPage(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="scroll-to-top">
      {heightPage > 300 ? (
        <div>
          <BackTop
            className="scrolltotop fw-bold"
            style={{ color: "white", right: "85px" }}
          >
            <UpOutlined className='fw-bold'/>
          </BackTop>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default ScrollToTop;