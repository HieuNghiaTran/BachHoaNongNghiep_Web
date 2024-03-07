import { Link } from "react-router-dom";
import History from "../components/layout/history";
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Table } from 'antd';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../services/setHead";
import { UserContext } from "../context/userContext";
import { submitDetail, submitOrder } from "../services/orderServies"
import { Radio, Space } from 'antd';
import { paymentVNPay } from "../services/paymentServices";




const SubmitOrderPage = () => {
    const { user } = useContext(UserContext)
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const pt = useSelector(state => state.cartProvider)
    const [total, setTotal] = useState()
    const [feeship, setFeeship] = useState(25000)
    const [note, setNote] = useState('')
    const [value, setValue] = useState('')


    const [orderID, setOrderID] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    useEffect(() => {


        setProduct(pt.listCart)
        setTotal(product.reduce((acc, item) => (acc + item.price_product * item.quantity), 0) + feeship)


    }, [pt.listCart])


    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    const submitMyOrder = async () => {
        try {
            if (value === 1) {
                alert("1")
                let data = new FormData()
                data = {
                    username: user.username,
                    name: name,
                    email: email,
                    note: note,
                    address: address,
                    phone: phone,
                    total: total,
                    status: "Chưa Thanh Toán",
                    feeship: feeship,
                    create_time: currentDateTime,
                }
                let data2 = new FormData();
                data2 = {
                    name: name,
                    phone: phone,
                    time: currentDateTime,
                    product: product
                }

                let res = await submitOrder(data)
                let rs = await submitDetail(data2)
                toast.success("Thanh Cong")


            } else {
                alert("2")
                try {

                    let data = new FormData();
                    data = {
                        amount: total,
                        language:""

                    }
                    let res = await paymentVNPay(data)
                    window.location.replace(res.data);
                } catch (err) {
                    console.log(err)

                }
            }


        } catch (err) {
            console.log(err)

        }


    }


    const columns = [
        {
            title: '',
            dataIndex: 'images[0].url',
            key: 'name',
            render: (text, record) => <img src={record.images[0].url} alt={record.images[0].url} style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name_product',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price_product',
            key: 'age',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'age',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price_product',
            key: 'total',
            render: (text, record) => record.quantity * record.price_product,
        },
    ];

    return (

        <>
            <MetaData title={"Thông tin đơn hàng"}></MetaData>
            <div className="container">

                <div className="row">
                    <div className="p-left col-md-6">
                        <div className="logo text-center"><Link to={"/trang-chu"}><img src={require("../components/images/logo.png")}></img></Link></div>
                        <History />
                        <div className="h2 my-3 text-center" style={{ fontWeight: "bold" }}>Thông tin đặt hàng</div>
                        <div className="my-3 text-center">Bạn đã có tài khoản chưa? <span><Link>Đăng nhập</Link></span></div>


                        <div>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ tên',
                                        },
                                    ]}
                                >
                                    <Input value={name} onChange={(e) => { setName(e.target.value) }} />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email là cần thiết',
                                        },
                                    ]}
                                >
                                    <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Form.Item>


                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại',
                                        },
                                    ]}
                                >
                                    <Input value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ giao hàng"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập địa chỉ để giao hàng',
                                        },
                                    ]}
                                >
                                    <Input.TextArea value={address} onChange={(e) => { setAddress(e.target.value) }} />



                                </Form.Item>
                                <Form.Item
                                    label="Ghi chú đơn hàng"
                                    name="note"
                                    rules={[
                                        {
                                            required: false,

                                        },
                                    ]}
                                >
                                    <Input.TextArea value={note} onChange={(e) => { setNote(e.target.value) }} />


                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Tôi đã đọc kỹ thông tin</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 10,
                                    }}
                                >
                                    <label style={{ fontWeight: "bold" }} className="mb-2">Chọn Phương Thức Thanh Toán</label>
                                    <Radio.Group onChange={(e) => { setValue(e.target.value) }} value={value}>
                                        <Space direction="vertical">
                                            <Radio value={1}><span ><img className="mx-2" width={"32rem"} src={require("../components/images/thanhtoankhinhanhang.png")}></img></span>Thanh toán khi nhận hàng</Radio>
                                            <Radio value={2}><span ><img className="mx-2" width={"30rem"} src={require("../components/images/VNPAY.png")}></img></span>Ví điện tử VNPAY</Radio>


                                        </Space>
                                    </Radio.Group>


                                </Form.Item>



                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" onClick={submitMyOrder}>
                                        Tiến hành đặt hàng
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>


                    </div>
                    <div className="p-right col-md-6">

                        <Table dataSource={product} columns={columns} />
                        <div className="d-flex justify-content-between my-4 mx-3 border-top border-bottom p-3">
                            <div className="" style={{ fontSize: "1.1rem" }}>Chương trình khách hàng thân thiết</div>
                            <button className="btn btn-success">Đăng nhập</button>



                        </div>

                        <div className="my-4 mx-3  border-bottom p-3">

                            <div className="d-flex justify-content-between">

                                <span>Tạm tính:</span>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>{product.reduce((acc, item) => (acc + item.price_product * item.quantity), 0)} đ</span>

                            </div>
                            <div className="d-flex justify-content-between">

                                <span>Phí vận chuyển:</span>
                                <span>---</span>


                            </div>








                        </div>

                        <div className="my-4 mx-3 p-3">
                            <div className="d-flex justify-content-between">


                                <span>Tổng Cộng:</span>
                                <span>---</span>


                            </div>


                        </div>






                    </div>







                </div>



            </div>




        </>



    );



}
export default SubmitOrderPage