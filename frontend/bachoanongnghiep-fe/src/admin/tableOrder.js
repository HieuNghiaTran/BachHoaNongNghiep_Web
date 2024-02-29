import { FaRegAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllProduct } from '../services/productSevices';
import { getaAllOrder } from '../services/orderServies';
import { FaUser } from "react-icons/fa";
import { format } from 'date-fns';
const TableOrders = () => {
    const [listOrders, setListOrders] = useState([])
    const [product, setProduct] = useState([])



    useEffect(() => {
        fetchData()

    }, [])

    const fetchData = async () => {

        try {

            let res = await getaAllOrder()
            setListOrders(res.data)
        } catch (err) {

            console.log(err)
        }

    }

    return (
        <>




            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Thông tin khách hàng</th>
                        <th>Giá trị đơn</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrders.length > 0 && listOrders.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id}</td>
                            <td className="">
                                <div><span><FaUser className="mx-2" />Họ và tên: </span><span className="mx-2" style={{ color: "red" }}> {item.name}</span></div>
                                <div><span><FaPhone className="mx-2" />Số điện thoai:</span><span className="mx-2" style={{ color: "red" }}>{item.phone}</span></div>
                                <div><span><FaRegAddressBook className="mx-2" />Địa chỉ:</span><span className="mx-2" style={{ color: "red" }}>{item.address}</span></div>
                                <div><span><FaRegAddressBook className="mx-2" />Email:</span><span className="mx-2" style={{ color: "red" }}>{item.mail}</span></div>

                            </td>
                            <td style={{ color: "red", fontWeight: "bolder" }} className="text-center m-auto">{item.total} đ</td>
                            <td >{format(new Date(item.create_time), 'dd/MM/yyyy HH:mm:ss')}</td>
                            <td>{item.status}</td>
                            <td>

                                <button type="button" class="btn btn-outline-success mx-1">

                                    Chi tiết


                                </button>
                                <button type="button" class="btn btn-outline-success mx-1"
                                >

                                    In hoá đơn
                                </button>
                                <button type="button" class="btn btn-outline-danger">

                                 Cập nhật

                                </button>


                                <button type="button" class="btn btn-outline-danger">

                                    Xoá

                                </button>



                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </>




    )



}

export default TableOrders