import { Modal } from "antd";
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { postReview } from "../../services/productSevices";
import { UserContext } from "../../context/userContext";

const CommentModal = (props) => {
    const { isModalVisible, handleCloseModal, product, submit } = props
    const [comment, setComment] = useState()
    const dispatch = useDispatch()
    const [rating, setRating] = useState()
    const { user } = useContext(UserContext)
    

    const submitReview = async () => {
        let data = new FormData()
        data = {
            user: user,
            rating: 4,
            comment: comment,
            productId: product._id
        }
        console.log(data);
        let res = await postReview(data)
        
        toast.success("Đã thực hiện đánh giá")



    }





    return (
        <Modal
            title="Đánh Giá Sản Phẩm"
            visible={isModalVisible}
            onClose={handleCloseModal}
            onOk={submitReview}
            onCancel={handleCloseModal}

        >
            <div>


                <div>
                    <div className="d-flex justify-content-center align-item-center"><img style={{ objectFit: "cover", position: "relative", }} className="w-50 h1-50" src={product.images?.[0]?.url}></img></div>

                    <div className="d-flex justify-content-center align-item-center h5 mt-3">{product.name_product}</div>


                </div>



                <div className="mt-0">
                    <div className="rating ">

                        <div className="modal-body ">

                            <ul className="stars w-100 d-flex justify-content-center align-item-center" >
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea
                                name="review"
                                id="review" className="form-control mt-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >

                            </textarea>

                        </div>



                    </div>
                </div>


            </div>
        </Modal>



    );



}
export default CommentModal

