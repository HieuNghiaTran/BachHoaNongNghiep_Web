import MetaData from "../../services/setHead"
import Sidebar from "../sidebar"
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Table } from 'antd';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrders from "../tableOrder";
import { getOrderWithPhoneNumber } from "../../services/orderServies";
import { AuthContext } from '../context/authContext';
import Loader from "../../components/layout/Loader";
const { Search } = Input;
const OrderManager = () => {
    const { addLocal, jwt, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [listOrder, setListOrder] = useState([])
    const onSearch = async () => {
        setLoading(true)
        let res = await getOrderWithPhoneNumber(value);
        setListOrder(res.data)
        setLoading(false)

    }


    if (!jwt && !user ) {
        alert("Bạn không có quyền truy cập.")
        return <Navigate to="/admin/login" replace />;
    }




    return (<>
        <MetaData title={"Quản lý đơn hàng"}></MetaData>




        {loading ? (
    <Loader />
) : (
    <div className="grid-bg ba-grid anim">
        <div className="inner">
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className=" col-12 col-md-9">
                    <div className="mb-4 d-flex">
                        <h1 className="">Quản lý đơn hàng</h1>
                        <div className="m-auto" style={{ flexBasis: "40%" }}>
                            <Search
                                placeholder="Nhập số điện thoại khách hàng..."
                                allowClear
                                enterButton="Search"
                                size="large"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    onSearch();
                                }}
                                width={400}
                                onSearch={onSearch}
                            />
                        </div>
                    </div>
                    <>
                        <div className="row pr-4">
                            <TableOrders order={listOrder} />
                        </div>
                    </>
                    <div className='row'>
                        <div className='col-md-6'>
                            {/* Content for the left half */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
<div className='pageginate'></div>







    </>)

}


export default OrderManager