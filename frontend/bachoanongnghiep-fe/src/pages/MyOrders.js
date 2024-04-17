import { format } from 'date-fns';
import { useEffect, useState, useContext } from "react";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import History from "../components/layout/history";
import MetaData from "../services/setHead";
import { Table } from 'antd';
import { getMyOrder } from "../services/orderServies";
import { UserContext } from "../context/userContext";
import { FaRegAddressBook, FaPhone, FaUser } from "react-icons/fa";
import AppChat from '../components/layout/appchat';

const MyOrder = () => {
  const { user } = useContext(UserContext);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyOrder(user.username);
        setListOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [user.username]);

  const dataSource = listOrder.map((item, index) => ({
    key: index.toString(),
    code: item._id,
    date: format(new Date(item.create_time), 'dd/MM/yyyy HH:mm:ss'),
    total: <span className="text-center" style={{ color: "red", fontWeight: "bold" }}>{item.total}đ</span>,
    payment: item.payment_status === "VNPAY" ? (
      <>
        <span><img className="mx-2" width={"32rem"} src={require("../components/images/VNPAY.png")} alt="Thanh toán khi nhận hàng"></img></span>
        <button className="btn btn-light">Đã thanh toán</button>
      </>
    ) : (
      <>
        <span><img className="mx-2" width={"32rem"} src={require("../components/images/thanhtoankhinhanhang.png")} alt="Thanh toán khi nhận hàng"></img></span>
        <button className="btn btn-light">Thanh toán khi nhận hàng</button>
      </>
    ),
    shipping: (
      <div>
        <span><FaUser className="mx-2" />Họ và tên: </span>
        <span className="mx-2" style={{ color: "red" }}>
          {item.name}
        </span>
        <br />
        <span><FaPhone className="mx-2" />Số điện thoai:</span>
        <span className="mx-2" style={{ color: "red" }}>
          {item.phone}
        </span>
        <br />
        <span><FaRegAddressBook className="mx-2" />Địa chỉ:</span>
        <span className="mx-2" style={{ color: "red" }}>
          {item.address}
        </span>
      </div>
    ),
  }));

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Thông tin thanh toán',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Thông tin vận chuyển',
      dataIndex: 'shipping',
      key: 'shipping',
    },
  ];

  return (
    <>
      <div><Header /></div>
      <div>
        <div><History data={"Trang chủ / "} last_item={`Đơn hàng của tôi`} /></div>
        <MetaData title={"Đơn hàng của bạn"}></MetaData>
        <div className="col-md-8 m-auto">
          <div className='h2 mb-4 text-center h2 p-2 fw-bold my-4' style={{ fontFamily: "'Roboto', sans-serif" }}>ĐƠN HÀNG CỦA TÔI</div>
          <div className="table-product" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
      <AppChat />
      <div className="m-auto"><Footer /></div>
    </>
  );
};

export default MyOrder;
