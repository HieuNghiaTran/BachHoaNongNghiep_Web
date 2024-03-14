import React, { useContext } from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import querystring from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, getDetailUser } from '../../services/userServices';
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
    const [pass, setPass] = useState('');
    const [error_username, set_error_username] = useState(false)
    const [error_password, set_error_password] = useState(false)
    const [redirect, set_redirect] = useState(false)
    const [errorMessages, setErroMessege] = useState('')
    const [statusMessages, setStatusMessages] = useState(false)

    const [boldTitle, setBoldTitle] = useState(false)


    const [fullname, setFullname] = useState('')
    const [Email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const md_1 = document.getElementsByClassName('.mdal-1');

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModalsSign = () => {
        setIsShowModalSign(true);
        //handleClose();

    }

    const dispatch = useDispatch();
    //const count_change = useSelector(state => state.Count.isLoad);
    const handleLogin = async () => {

        const params = { username, pass };
        const query = "?" + querystring.stringify(params);
       

        try {
            let res = await getDetailUser(query);
            console.log(res)
            if (res.msg === "Không Tìm Thấy Users") {
                setStatusMessages(true)
                setErroMessege("Tài  khoản hoặc mật khẩu chưa chính xác")

            } else {
                if (res.msg === "Sai Mat Khau") {
                    setStatusMessages(true)
                    setErroMessege("Tài  khoản hoặc mật khẩu chưa chính xác")

                } else {

                    login(res.jwt, res.user)
                    const action = addSession(res._id)
                    dispatch(action)
                    //const action_count_change = changeCount(count_change)
                    //dispatch(action_count_change)
                    handleClose()
                    alert("Đăng nhập thành công! Xin chào,"+" "+username)

                }
            }



            


        } catch (err) {
            ///toast.error("Tài khoản hoặc mật khẩu sai !!");
        }

       
        setUsername('');
        setPass('')
    }
    const Close = () => {

        setIsShowModalSign(false)
    }


    /////

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
            }
            else {
                setStatusMessages(true)
                setErroMessege("Username hoặc Email tồn tại")



            }
        } catch (err) {

            toast.error("Error add new!!");
            handleClose();
            console.log(err)
        }


        setEmail('')
        setPass();
        setFullname('')
        setPhone('')
        setUsername('')
        setStatusMessages(false)
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
                                                message: 'Vui long',
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


                                        <Button type="primary" htmlType="submit">
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
                                            message: 'Vui long',
                                        },
                                    ]}
                                >
                                    <Input value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    label="Họ và tên"
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email là cần thiết',
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
                                            message: 'Email là cần thiết',
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
                                            required: false,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Input value={Email}
                                        onChange={(e) => setEmail(e.target.value)} />
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
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Tôi đã đọc kỹ thông tin</Checkbox>
                                </Form.Item>
                                {statusMessages ? (<div className="bold text-center mb-4" style={{ color: "red", fontWeight: "bold" }}><span className="m-2"><FcCancel style={{ color: "red", fontWeight: "bold" }} /></span>{errorMessages}</div>) : <></>}

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
        </Modal>

        </>

    );



};

export default ModalsLoginForm;