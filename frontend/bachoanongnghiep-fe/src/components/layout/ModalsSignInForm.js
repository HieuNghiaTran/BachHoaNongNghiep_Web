import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ModalsSignInForm = (props) => {
    const { show, handleClose } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="d-flex flex-column">
                <Modal.Title>ĐĂNG KÝ TÀI KHOẢN</Modal.Title>
                <Form.Text className="text-muted">
                    Bạn đã có tài khoản? <a href="/">Đăng nhập tại đây</a>
                </Form.Text>
            </Modal.Header>
            <Modal.Body>

                <Form>

                    <Form.Group className="mb-3" >
                        <Form.Label>Họ:</Form.Label>
                        <Form.Control type="text" placeholder="Họ" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên:</Form.Label>
                        <Form.Control type="text" placeholder="Tên" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại:</Form.Label>
                        <Form.Control type="text" placeholder="Số điện thoại" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Tôi đồng ý đăng ký" />
                    </Form.Group>
                    <div className="sbmit_area_btn">
                        <Button type="submit" className="btn-login">
                            Đăng ký tài khoản
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalsSignInForm;
