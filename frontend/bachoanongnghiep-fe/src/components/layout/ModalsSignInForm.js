import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';


import { addNewUser } from '../../services/userServices';
import { toast } from 'react-toastify';


import { Button, Checkbox, Form, Input, Table } from 'antd';


const ModalsSignInForm = (props) => {
    const { show, handleClose } = props;
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlAddNewUser = async () => {
        
        let data= new FormData()
        data = {
            username: username,
            password: pass,
            fullname: fullname,
            email: email,
            phone: phone,
        };

    
        try {
            const res = await addNewUser(data); 
            handleClose();
            toast.success("Add User Success!!");
        } catch (err) {
            toast.error("Error adding new user!!");
            console.log(err);
        }
    };
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="d-flex flex-column">
                <Modal.Title>ĐĂNG KÝ TÀI KHOẢN</Modal.Title>
                <Form.Text className="text-muted">
                    Bạn đã có tài khoản? <a href="/">Đăng nhập tại đây</a>
                </Form.Text>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
        </Modal>
    );
};

export default ModalsSignInForm;
