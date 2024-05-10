import { FaRegAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TfiEmail } from "react-icons/tfi";
import { getDetailOrder, getaAllOrder } from '../services/orderServies';
import { FaUser } from "react-icons/fa";
import { format } from 'date-fns';
import ModalDetailOrder from "./ModalDetailOrder";
import { IoDocumentText } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import ModalDelete from "./ModalsDelete";
import { FaShippingFast } from "react-icons/fa";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CreateOrderShip, hanldeCreateShip } from "../services/GhnServies";
import { Empty } from 'antd';
import ModalUpdateStatusOrder from "./ModalUpdateStatusOrder";

const TableOrders = ({ order }) => {

    const [product, setProduct] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [feeship, setFeeship] = useState();
    const [id, setID] = useState('');
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [note, seNote] = useState('')
    const [statusOrder, setStatusOrder] = useState('')



    pdfMake.vfs = pdfFonts.pdfMake.vfs;
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



    const CloseModal = () => {
        setIsShowModal(false);
        setIsShowModalDelete(false);
        setIsShowModalUpdate(false)
    };
    const handleSubmitShip = async (name, phone, address, cod, id) => {
        try {

            const res = await getDetailOrder(id);
            const products = res.data[0].product;

            if (products && products.length > 0) {
                const formattedProducts = products.map(product => [
                    product.name_product,
                    product.count,
                    product.price_product,
                    product.price_product * product.count
                ]);

                const response = await CreateOrderShip(name, phone, address, cod, formattedProducts);
                console.log(response)
                if (response.data.code === "200") {

                    let data1 = new FormData()
                    data1 = {

                        id_delivery: response.data.data.order_code,
                        id_order: id,
                        Ship_name: "GHN"

                    }

                    let res = await hanldeCreateShip(data1)


                }

                alert("Tạo đơn ship thành công !");
            } else {
                alert("Không có sản phẩm trong đơn hàng.");
            }
        } catch (error) {
            console.error("Error while handling shipping:", error);
            alert("Đã xảy ra lỗi khi tạo đơn ship.");
        }
    };



    const handlePrint = async (id, name, phone, address, bill) => {

        let newArray = [];
        let product = []

        let res = await getDetailOrder(id);
        product = res.data[0].product
        if (product) {
            for (let i = 0; i < product.length; i++) {
                newArray.push([product[i].name_product, product[i].count, product[i].price_product, product[i].price_product * product[i].count]);
            }

        }
        const docDefinition = {
            content: [
                {
                    text: "Hóa đơn bán hàng",
                    style: {
                        fontSize: 22,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 20]

                    },
                },
                {
                    text: "Ngày tạo: " + " " + new Date().toLocaleDateString(),
                    style: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 0, 0, 30]
                    },
                },
                {
                    text: "Thông tin khách hàng:",
                    style: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 0, 0, 30]
                    },
                },
                {
                    text: "Khách hàng:" + " " + name,
                    style: {
                        fontSize: 12,
                        margin: [0, 0, 0, 30]
                    },
                },
                {
                    text: "Địa chỉ:" + " " + address,
                    style: {
                        fontSize: 12,
                        margin: [0, 0, 0, 30]
                    },
                },
                {
                    text: "Số điện thoại:" + " " + phone,
                    style: {
                        fontSize: 12,
                        margin: [0, 0, 0, 30]
                    },
                },
                {
                    text: "Danh sách sản phẩm:",
                    style: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 0, 0, 30]
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
                    text: "",
                    style: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 0, 0, 30]
                    },
                },

                {
                    text: "Phí giao hàng:" + " " + "25.000đ",
                    style: {
                        fontSize: 12,
                        margin: [0, 40, 0, 30]
                    },
                },


                
                {
                    text: " " + "Tổng cộng:" + " " + bill + " đ",
                    style: {
                        fontSize: 12,
                        bold: true,
                    },
                },

            ],
        };
        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.download(`Bill_KH_${name}.pdf`);
    };

    return (
        <>
            {order && order.length > 0 ? (
                <div>
                    <Table style={{ tableLayout: "auto", width: '100%' }} striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Mã đơn hàng</th>
                                <th>Thông tin khách hàng</th>
                                <th>Giá trị đơn</th>
                                <th>Ngày tạo</th>
                                <th>Phương thức thanh toán</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.length > 0 && order.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td className="">
                                        <div><span><FaUser className="mx-2" />Họ và tên: </span><span className="mx-2" style={{ color: "red" }}> {item.name}</span></div>
                                        <div><span><FaPhone className="mx-2" />Số điện thoai:</span><span className="mx-2" style={{ color: "red" }}>{item.phone}</span></div>
                                        <div><span><FaRegAddressBook className="mx-2" />Địa chỉ:</span><span className="mx-2" style={{ color: "red" }}>{item.address}</span></div>
                                        <div><span><TfiEmail className="mx-2" />Email:</span><span className="mx-2" style={{ color: "red" }}>{item.mail}</span></div>
                                    </td>
                                    <td style={{ color: "red", fontWeight: "bolder" }} className="text-center m-auto">{parseInt(item.total).toLocaleString()} đ</td>
                                    <td >{format(new Date(item.create_time), 'dd/MM/yyyy HH:mm:ss')}</td>
                                    <td>
                                        {item.payment_status === "VNPAY" ? (
                                            <>
                                                <span><img className="mx-2" width={"32rem"} src={require("../components/images/VNPAY.png")} alt="Thanh toán khi nhận hàng"></img></span>
                                                <button className="btn btn-light">Đã thanh toán</button>
                                            </>
                                        ) : (
                                            <>
                                                <span><img className="mx-2" width={"32rem"} src={require("../components/images/thanhtoankhinhanhang.png")} alt="Thanh toán khi nhận hàng"></img></span>
                                                <button className="btn btn-light">Khi nhận hàng</button>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary mx-1" onClick={() => {
                                            setID(item._id)
                                            setFeeship(item.feeship)
                                            seNote(item.note)
                                            setIsShowModal(true)
                                        }}>
                                            <span className="" style={{ marginRight: "0.2rem" }}><IoDocumentText /></span>
                                            Chi tiết
                                        </button>
                                        <button type="button" className="btn btn-success mx-1" onClick={() => {


                                            handlePrint(item._id, item.name, item.phone, item.address, item.total)

                                        }}>
                                            <MdLocalPrintshop style={{ marginRight: "0.2rem" }} />
                                            In hoá đơn
                                        </button>

                                        <button type="button" className="btn btn-warning mx-2" s
                                            onClick={() => {
                                                handleSubmitShip(item.name, item.phone, item.address, item.total, item._id)
                                            }}>
                                            <FaShippingFast style={{ marginRight: "0.2rem" }} />
                                            Tạo đơn vận chuyển
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                            setID(item._id)
                                            setStatusOrder(item.status)
                                            setIsShowModalUpdate(true)



                                        }}>
                                            <FaPencil style={{ marginRight: "0.2rem" }} />
                                            Cập nhật
                                        </button>


                                        <button type="button" className="mx-2 btn btn-danger"
                                            onClick={() => {
                                                setID(item._id)
                                                setIsShowModalDelete(true)
                                            }}>
                                            <MdDelete style={{ marginRight: "0.2rem" }} />
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>



                </div>

            ) : <Empty />}

            <ModalDetailOrder
                isModalVisible={isShowModal}
                handleCloseModal={CloseModal}
                id_order={id}
                ship={feeship}
                note={note}
            />

            <ModalDelete
                isModalVisible={isShowModalDelete}
                handleCloseModal={CloseModal}
                order={id}
            />

            <ModalUpdateStatusOrder

                isModalVisible={isShowModalUpdate}
                handleCloseModal={CloseModal}
                id={id}
                status={statusOrder}

            />

        </>
    );
}

export default TableOrders;
