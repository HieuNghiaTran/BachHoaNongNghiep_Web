import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import socketIOClient from 'socket.io-client';
import { postReview } from '../../services/productSevices';
import { UserContext } from '../../context/userContext';
import { SubmitContext } from '../../context/submitContext';

const CommentModal = (props) => {
    const { isModalVisible, handleCloseModal, product } = props;
    const { user } = useContext(UserContext);
    const { onSubmit ,submit } = useContext(SubmitContext);
    const [socket, setSocket] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const socket = socketIOClient('http://localhost:8001');
        setSocket(socket);
        return () => socket.disconnect();
    }, []);

    const setUserRatings = (value) => {
        setRating(value);
    };

    const submitReview = async () => {
        if (!user) {
            // Handle case where user is not logged in
            return;
        }

        const data = {
            user: user,
            rating: rating,
            comment: comment,
            productId: product._id,
        };

        if (socket) {
            socket.emit('comment', data);
        }

        try {
            await postReview(data);
            toast.success('Đã thực hiện đánh giá');
            handleCloseModal();
            if(submit===false)onSubmit();
            alert("3"+submit)
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <Modal
            title="Đánh Giá Sản Phẩm"
            visible={isModalVisible}
            onOk={submitReview}
            onCancel={handleCloseModal}
        >
            <div>
                <div className="d-flex justify-content-center align-item-center">
                    <img style={{ objectFit: 'cover', position: 'relative' }} className="w-50 h1-50" src={product.images?.[0]?.url} alt={product.name_product} />
                </div>
                <div className="d-flex justify-content-center align-item-center h5 mt-3">{product.name_product}</div>
                <div className="mt-3">
                    <div className="rating">
                        <div className="modal-body">
                            <ul className="stars w-100 d-flex justify-content-center align-item-center">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <li className="star" key={value} onClick={() => setUserRatings(value)}>
                                        <i className={`fa fa-star${value <= rating ? ' orange' : ''}`}></i>
                                    </li>
                                ))}
                            </ul>
                            <textarea
                                name="review"
                                id="review"
                                className="form-control mt-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CommentModal;
