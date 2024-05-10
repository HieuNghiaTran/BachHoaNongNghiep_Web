

import { Button, Result } from 'antd';
const FailOrder=()=>{

return (<>

<Result
    status="error"
    title="Thanh toán thất bại"
    subTitle="Vui lòng thanh toán lại"
    extra={[
      
        <Button key="buy" onClick={()=>{window.location.href="/trang-chu"}}>Buy Again</Button>,
    ]}
  ></Result>


</>)


}
export default FailOrder