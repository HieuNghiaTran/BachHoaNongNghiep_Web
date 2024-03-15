import React from 'react';
import { Button, Result } from 'antd';
import { Navigate } from 'react-router-dom';
const SuccessOrder = () => (
  <Result
    status="success"
    title="Đơn hàng đã đặt thành công !"
    subTitle="Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất"
    extra={[
   
      <Button key="buy" onClick={()=>{window.location.href="/trang-chu"}}>Buy Again</Button>,
    ]}
  />
);
export default SuccessOrder;