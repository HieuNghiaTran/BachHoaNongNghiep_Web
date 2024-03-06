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
import { Font } from '@react-pdf/renderer';
import ArialUnicodeMS from './css/Arial-Unicode-Regular.ttf'
import { IoDocumentText } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
const TableOrders = () => {

    const [listOrders, setListOrders] = useState([])
    const [product, setProduct] = useState([])
    const [billTotal, setBillTotal] = useState()
    const [isShowModal, setIsShowModal] = useState(false)
    const CloseModal = () => { setIsShowModal(false) }
    const [dataModal, setDataModal] = useState([])
    const [feeship, setFeeship] = useState()
    const [id, setID] = useState('')


    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()


    useEffect(() => {
        fetchData()

    }, [])

    const fetchDataPrint = async (id) => {
        try {
            let res = await getDetailOrder(id)
            setProduct(res.data[0].product)

        } catch (err) {
            console.log(err)
        }
    }

    const handlePrint = () => {
        const doc = new jsPDF();
        console.log(doc.getFontList());
        doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");
        let newArray = [];
        for (let i = 0; i < product.length; i++) {
            newArray.push([i + 1, product[i].name_product, product[i].price_product, product[i].count, product[i].price_product * product[i].count]);
        }
    
        doc.addImage("https://res.cloudinary.com/dofj1px4t/image/upload/v1709280860/products/M2RyLi9k_u9k4n7.png", 'PNG', 60, 10, 80, 40);
    
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
    
        doc.text(`Date: ${today}`, 20, 60); // Căn lề trái cho ngày
        doc.text(`Customer : ${name}`, 20, 65); // Căn lề trái cho thông tin khách hàng
        doc.text(`Address : ${address}`, 20, 70); // Căn lề trái cho thông tin địa chỉ
        doc.text(`Phone Number : ${phone}`, 20, 75); // Căn lề trái cho thông tin số điện thoại
        doc.text(`Email : ${email}`, 20, 80); // Căn lề trái cho thông tin email
    
        autoTable(doc, {
            head: [['STT', 'Name Product', 'Price', 'Quantity', 'Total']],
            body: newArray,
            startY: 90,
        }); 
    
        let finalY = doc.previousAutoTable.finalY;
        doc.text(`Tổng cộng hoá đơn: ${billTotal}`, 12, finalY + 10);
    
        doc.save(`Bill_KH_${name}.pdf`);
    }
    

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
                                <button type="button" className="btn btn-primary mx-1" onClick={() => {
                                    setID(item._id)
                                    setFeeship(item.feeship)
                                    setIsShowModal(true)
                                }}>
                                    <span className="" style={{marginRight:"0.2rem"}}><IoDocumentText /></span>
                                    Chi tiết
                                </button>
                                <button type="button" className="btn btn-success mx-1" onClick={() => {
                                    setName(item.name)
                                    setEmail(item.mail)
                                    setPhone(item.phone)
                                    setAddress(item.address)
                                    fetchDataPrint(item._id)
                                    handlePrint()
                                }}>
                                    <MdLocalPrintshop style={{marginRight:"0.2rem"}}/>
                                    In hoá đơn
                                </button>
                                <button type="button" className="btn btn-secondary">
                                <FaPencil style={{marginRight:"0.2rem"}}/>
                                    Cập nhật
                                </button>
                                <button type="button" className="mx-2 btn btn-danger">
                                <MdDelete style={{marginRight:"0.2rem"}}/>
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
        </>
    )
}

export default TableOrders
