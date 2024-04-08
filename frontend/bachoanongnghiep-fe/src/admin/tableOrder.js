import { FaRegAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllProduct } from '../services/productSevices';
import { getDetailOrder, getaAllOrder } from '../services/orderServies';
import { FaUser } from "react-icons/fa";
import { format } from 'date-fns';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import ModalDetailOrder from "./ModalDetailOrder";
import { IoDocumentText } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import ModalDelete from "./ModalsDelete";
import { FaShippingFast } from "react-icons/fa";
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import CreateOrderShip from "../services/GhnServies";

const TableOrders = ({ order }) => {

    const [listOrders, setListOrders] = useState([])
    const [product, setProduct] = useState([])
    const [billTotal, setBillTotal] = useState()
    const [isShowModal, setIsShowModal] = useState(false)
    const CloseModal = () => {
        setIsShowModal(false)
        setIsShowModalDelete(false)

    }
    const [dataModal, setDataModal] = useState([])
    const [feeship, setFeeship] = useState()
    const [id, setID] = useState('')


    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [invoiceData, setInvoiceData] = useState({})



    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const fontDescriptors = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    };


    pdfMake.fonts = {
        Roboto: fontDescriptors.Roboto
    };



    const handleSubmitShip = async () => {

        let res = await CreateOrderShip()
        console.log(res)
    };
       






    useEffect(() => {
        if (order && order.length > 0) {
            setListOrders(order);
        } else {
            fetchData();
        }
    }, [order]);


    const fetchDataPrint = async (id) => {
        try {
            let res = await getDetailOrder(id)
            setProduct(res.data[0].product)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        const invoiceData = {
            customer: {
                name: name,
                address: address,
                phone: phone,
            },
            items: product.map((item) => ({
                name: item.name_product,
                quantity: item.quantity,
                price: item.price_product,
            })),
            total: billTotal !== undefined ? billTotal.toLocaleString() : '0',
        };
        setInvoiceData(invoiceData);
    }, [product, name, address, phone, billTotal]);





    const handlePrint = (item) => {

        setName(item.name)
        setEmail(item.mail)
        setPhone(item.phone)
        setAddress(item.address)
        fetchDataPrint(item._id);

        let newArray = [];
        for (let i = 0; i < product.length; i++) {
            newArray.push([product[i].name_product, product[i].count, product[i].price_product, product[i].price_product * product[i].count]);
        }

        const docDefinition = {
            content: [

                {
                    text: "Hóa đơn",
                    style: {
                        fontSize: 22,
                        bold: true,
                        alignment: 'center'
                    },
                },

                {
                    text: "Ngày tạo: " + " " + new Date().toLocaleDateString(),
                    style: {
                        fontSize: 12,
                        bold: true
                    },
                },
                {
                    text: "Thông tin khách hàng:",
                    style: {
                        fontSize: 14,
                        bold: true,
                    },
                },
                {
                    text: "Khách hàng:" + " " + invoiceData.customer.name,
                    style: {
                        fontSize: 12,
                    },
                },
                {
                    text: "Địa chỉ:" + " " + invoiceData.customer.address,
                    style: {
                        fontSize: 12,
                    },
                },
                {
                    text: "Số điện thoại:" + " " + invoiceData.customer.phone,
                    style: {
                        fontSize: 12,
                    },
                },
                {
                    text: "Danh sách sản phẩm:",
                    style: {
                        fontSize: 12,
                        bold: true,
                    },
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*", "*", "*"],
                        body: [
                            ["Tên sản phẩm", "Số lượng", "Giá", "Thành tiền"],
                            ...newArray



                        ],
                    },
                },
                {
                    text: "Tổng cộng:",
                    style: {
                        fontSize: 12,
                        bold: true,
                    },
                },
                {
                    text: invoiceData.total.toLocaleString(),
                    style: {
                        fontSize: 12,
                    },
                },
            ],
        }



        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.download("Bill_Kh.pdf");
    };

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
                            <td>
                                {item.status === "Đã Thanh Toán" ? (
                                    <>
                                        <span><img className="mx-2" width={"32rem"} src={require("../components/images/VNPAY.png")} alt="Thanh toán khi nhận hàng"></img></span>
                                        <button className="btn btn-light">Đã thanh toán</button>
                                    </>
                                ) : (

                                    <>
                                        <span><img className="mx-2" width={"32rem"} src={require("../components/images/thanhtoankhinhanhang.png")} alt="Thanh toán khi nhận hàng"></img></span>
                                        <button className="btn btn-light">Đã đặt hàng</button>

                                    </>
                                )}
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary mx-1" onClick={() => {
                                    setID(item._id)
                                    setFeeship(item.feeship)
                                    setIsShowModal(true)
                                }}>
                                    <span className="" style={{ marginRight: "0.2rem" }}><IoDocumentText /></span>
                                    Chi tiết
                                </button>
                                <button type="button" className="btn btn-success mx-1" onClick={() => {

                                    handlePrint(item)
                                }
                                }>
                                    <MdLocalPrintshop style={{ marginRight: "0.2rem" }} />
                                    In hoá đơn
                                </button>
                                <button type="button" className="btn btn-secondary">
                                    <FaPencil style={{ marginRight: "0.2rem" }} />
                                    Cập nhật
                                </button>


                                <button type="button" className="btn btn-warning mx-2" s


                                    onClick={() => {
                                        handleSubmitShip()



                                    }}>

                                    <FaShippingFast style={{ marginRight: "0.2rem" }} />
                                    Tạo đơn vận chuyển
                                </button>


                                <button type="button" className="mx-2 btn btn-danger"

                                    onClick={() => {
                                        setID(item._id)
                                        setIsShowModalDelete(true)
                                    }}

                                >
                                    <MdDelete style={{ marginRight: "0.2rem" }} />
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalDetailOrder
                isModalVisible={isShowModal}
                handleCloseModal={CloseModal}
                id_order={id}
                ship={feeship}
            />

            <ModalDelete
                isModalVisible={isShowModalDelete}
                handleCloseModal={CloseModal}
                order={id}

            />
        </>
    )
}

export default TableOrders
