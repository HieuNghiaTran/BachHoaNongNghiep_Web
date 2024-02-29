import React from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ModalsSignInForm from "./ModalsSignInForm";

const ModalsLoginForm = (props) => {
    const { show, handleClose } = props;
    const [isShowModalsSign, setIsShowModalSign] = useState(false);
    const showModalsSign = () => {
        console.log("clicked");
        setIsShowModalSign(true)

    }
    const Close = () => {

        setIsShowModalSign(false)
    }
    return (
        <><Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex flex-column">
            <Modal.Title>ĐĂNG NHẬP TÀI KHOẢN</Modal.Title>
            <Form.Text className="text-muted">
                Bạn chưa có tài khoản? <a onClick={showModalsSign}>Đăng ký tại đây</a>
            </Form.Text>
        </Modal.Header>
        <Modal.Body>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        Quên mật khẩu? <a href="/">Nhấn vào đây</a>
                    </Form.Text>
                </Form.Group>
                <div className="sbmit_area_btn">
                    <Button type="submit" className="btn-login">
                        Đăng nhập
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    <ModalsSignInForm show={isShowModalsSign} handleClose={Close} />
    </>
        
    );
    

    
};

export default ModalsLoginForm;
