import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import querystring from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, getDetailUser, getUser } from '../../services/userServices';
import { toast } from 'react-toastify';
import changeCount from '../actions/actionCount'
import { addSession, deleteSession } from '../actions/actionSection'
import { UserContext } from "../../context/userContext";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FcCancel } from "react-icons/fc";
import { Button, Checkbox, Form, Input, Table } from 'antd';
const ModalsLoginForm = (props) => {
    const { show, handleClose } = props;

    const { login } = useContext(UserContext);
    const [isShowModalsSign, setIsShowModalSign] = useState(false);
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('')
    const [errorMessages, setErroMessege] = useState('')
    const [errorMessagesTab2, setErroMessegeTab2] = useState('')
    const [statusMessages, setStatusMessages] = useState(false)
    const [boldTitle, setBoldTitle] = useState(false)
    const [fullname, setFullname] = useState('')
    const [Email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [alreadyAccount, setAlreadyAccount] = useState(false)

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModalsSign = () => {
        setIsShowModalSign(true);

    }

    const handleLogin = async () => {

        const params = { username, pass };
        const query = "?" + querystring.stringify(params);
       

        try {
            let res = await getDetailUser(query);
            console.log(res)
            if (res.msg === "Không Tìm Thấy Users") {
                console.log("ko tim tahy")
                setStatusMessages(true)
                setErroMessege("Khong tim thay User")

            } else {
                if (res.msg === "Sai mật khẩu") {
                    console.log("sai mk")
                    setStatusMessages(true)
                    setErroMessege("Tài khoản hoặc mật khẩu chưa chính xác")

                } else if(res.msg ==="Đăng nhập thành công") {
                    setStatusMessages(false)
                    login(res.jwt, res.user)
                    handleClose()
                    setUsername('');
                    setPass('')  
                    alert("Đăng nhập thành công! Xin chào," + " " + username)

                }
            }
           
        } catch (err) {
            setStatusMessages(true)
            setErroMessege("catch")
        }


       
    }
    const Close = () => {

        setIsShowModalSign(false)
    }

    useEffect(() => {
        if (!alreadyAccount) {

            setStatusMessages(false)
        }


    }, [alreadyAccount])






    const handleCheckAccount = async () => {
        if (username) {

            let res = await getUser(username);
            if (res.data) {
                setAlreadyAccount(true)
                alert("Tài Khoản Đã Tồn Tại! Vui lòng chọn Username khác")

            } else {
                setAlreadyAccount(false)

            }


        }


    }



    const handlAddNewUser = async () => {



        let data = new FormData()
        data = {
            username: username,
            id_permission: "65f19bd476bbf06b0c946ce8",
            password: pass,
            fullname: fullname,
            email: Email,
            phone: phone,

        };
        try {
            let res = await addNewUser(data);

            if (res.data.msg === "Bạn đã thêm thành công") {
                toast.success("Add User Success!!");
                handleClose();

                setEmail('')
                setPass();
                setFullname('')
                setPhone('')
                setUsername('')
                setStatusMessages(false)


            }
            else {

                setStatusMessages(true)
                setErroMessegeTab2("Username hoặc Email tồn tại")


            }
        } catch (err) {

            toast.error("Error add new!!");
            handleClose();
            console.log(err)
        }



    }




    return (
        <><Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton className="">
            </Modal.Header>
            <Modal.Body className="d-flex">

                <div className="left_modal">
                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3"
                        transition={true}
                        fill
                        onSelect={() => {
                            setBoldTitle(true);

                        }}
                    >
                        <Tab eventKey="home" tabIndex={1} title={<span className={'bold-title h4'}>Đăng nhập</span>} >
                            <div className="py-4">
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
                                    onFinish={handleLogin}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tên đăng nhập"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên đăng nhập',
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} />

                                    </Form.Item>
                                    <Form.Item
                                        label="Mật Khẩu"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu',
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)} />
                                    </Form.Item>

                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Checkbox>Ghi nhớ thông tin</Checkbox>


                                    </Form.Item>
                                    {statusMessages ? (<div className="bold text-center mb-4" style={{ color: "red", fontWeight: "bold" }}><span className="m-2"><FcCancel style={{ color: "red", fontWeight: "bold" }} /></span>{errorMessages}</div>) : <></>}


                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >


                                        <Button type="primary" htmlType="submit" style={{ width: "40%" }}>
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" tabIndex={2} title={<span className={'bold-title h4'}>Đăng ký</span>}>
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
                                onFinish={handlAddNewUser}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tên đăng nhập"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập tên đăng nhập",
                                        },
                                        {
                                            pattern: /^[a-z0-9_-]{3,16}$/,
                                            message: 'Tên đăng nhập không hợp lệ',
                                        },




                                    ]}
                                >
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => {
                                            handleCheckAccount();
                                        }}
                                    />
                                </Form.Item>



                                <Form.Item
                                    label="Họ và tên"
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ tên',
                                        },
                                    ]}
                                >
                                    <Input value={fullname}
                                        onChange={(e) => setFullname(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        {

                                            required: true,
                                            message: 'SĐT là cần thiết',
                                        },
                                        {
                                            pattern: /^0\d{9,10}$/,
                                            message: 'Số điện thoại không hợp lệ',
                                        },
                                    ]}
                                >
                                    <Input value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                </Form.Item>


                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ',
                                        },
                                    ]}
                                >
                                    <Input value={Email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    label="Mật Khẩu"
                                    name="pass"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    rules={[{ required: true, message: 'Vui lòng chọn' }]}
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,

                                    }}
                                >
                                    <Checkbox>Tôi đã đọc kỹ thông tin</Checkbox>
                                </Form.Item>



                                {statusMessages ? (<div className="bold text-center mb-4" style={{ color: "red", fontWeight: "bold" }}><span className="m-2"><FcCancel style={{ color: "red", fontWeight: "bold" }} /></span>{errorMessagesTab2}</div>) : <></>}


                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >



                                    <Button type="primary" htmlType="submit">
                                        Đăng ký tài khoản
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tab>

                    </Tabs>
                </div>
                <div className="right_modal d-flex justify-content-center align-item-center">
                    <img src={require("../images/Modal-flex-img.png")}></img>
                </div>

            </Modal.Body>
        </Modal >

        </>

    );



};

export default ModalsLoginForm;