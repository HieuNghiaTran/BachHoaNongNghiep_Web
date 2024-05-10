import MetaData from "../../services/setHead"
import Sidebar from "../sidebar"
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Table } from 'antd';
import { useContext, useEffect, useState } from "react";
import TableOrders from "../tableOrder";
import { getOrderWithPhoneNumber, getaAllOrder } from "../../services/orderServies";
import { AuthContext } from '../context/authContext';
import Loader from "../../components/layout/Loader";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const { Search } = Input;
const OrderManager = () => {
    const { addLocal, jwt, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [listOrders, setListOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(5);

    const onSearch = async () => {
        setLoading(true)
        let res = await getOrderWithPhoneNumber(value);
        setListOrders(res.data)
        setLoading(false)
        if (value === "") {
            fetchData()
        }

    }
    useEffect(() => {
        if (!localStorage.getItem('jwt') && !localStorage.getItem('user')) {
            alert("Bạn không có quyền truy cập!")
            window.location.replace("/admin/login")
        }



        fetchData();

    }, []);



    const fetchData = async () => {
        try {
            let res = await getaAllOrder();
            setListOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    }



    const handlePageClick = async (e) => {
        const currentPage = e.target.textContent;
        //fetchData(currentPage, perPage);
    }



    return (<>
        <MetaData title={"Order Manager"}></MetaData>

        {loading ? (
            <Loader />
        ) : (
            <div className="grid-bg ba-grid anim">
                <div className="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>
                        <div className=" col-12 col-md-10">
                            <div className="mb-4  d-flex">
                                <h1 className="fw-bold text-center">Quản lý đơn hàng</h1>
                                <div className="m-auto" style={{ float: "right", flexBasis: "40%" }}>
                                    <Search
                                        placeholder="Nhập số điện thoại khách hàng..."
                                        allowClear
                                        enterButton="Search"
                                        size="large"
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value);

                                        }}
                                        width={400}
                                        onSearch={onSearch}
                                    />
                                </div>
                            </div>
                            <>
                                <div className="row pr-4">
                                    <TableOrders order={listOrders} />
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
        <div className='pageginate'>
            {/* <Stack spacing={2}>
                <Pagination count={totalPages} color="success"

                    onChange={handlePageClick}
                    pageCount={totalPages}


                />
            </Stack> */}
        </div>







    </>)

}


export default OrderManager