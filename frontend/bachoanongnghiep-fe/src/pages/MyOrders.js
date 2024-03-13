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

const MyOrder = () => {
  const { user, logout } = useContext(UserContext);
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
    total: <span className="text-center" style={{color:"red", fontWeight:"bold"}}>{item.total}đ</span>,
    payment: <span className="btn btn-success ma-auto">{item.status}</span>,
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
        <div className="col-md-6 m-auto">
          <div className="h3 mb-2 m-2">Giỏ hàng của tôi</div>
          <div className="table-product">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
      <div className="m-auto"><Footer /></div>
    </>
  );
};

export default MyOrder;
