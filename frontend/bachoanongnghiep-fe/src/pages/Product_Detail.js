import { useContext, useEffect, useState } from "react";
import Header from "../components/layout/header";
import { getAllProduct, getProductDetail, postReview } from "../services/productSevices";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../services/setHead";
import Carousel from 'react-bootstrap/Carousel';
import './ccs/product_detail.scss'
import { CartContext } from "../context/cartContext";
import { toast } from 'react-toastify';
import { UserContext } from "../context/userContext";

import CommentModal from "../components/layout/ModalsComment"
import { addCart } from "../redux/actions/cartActions";
import ListReviews from "../components/layout/listReview";

const DetailProduct = (props) => {
    const dispatch = useDispatch();
    const [product, setProducts] = useState({});
    const [sale, setSale] = useState()
    const { id } = useParams();
    const { user } = useContext(UserContext)
    const [comment, setComment] = useState()
    const [count, setCount] = useState(1);
    const [rating, setRating] = useState()
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        fetData(id);

    }, [])

    const fetData = async (id) => {
        try {
            let res = await getProductDetail(id);
            setProducts(res.data);
        }
        catch (err) {
            alert(err)

        }





    }
    const CloseModal = () => { setIsShowModal(false) }


    const upCount = () => {

        setCount(count + 1);
    }
    const downCount = () => {

        if (count > 1) setCount(count - 1)
    }



    const addToCart = () => {

        let data = new FormData()
        data = {
            id: product._id,
            id_category: product.id_category,
            name_product: product.name_product,
            price_product: product.price_product,
            images: product.images

        }
        dispatch(addCart(data))
        toast.success("Đã thêm vào giỏ hàng!");
        console.log(user)

    }

    const setUserRatings = () => {

        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }


    




    return (
        <>
            <Header />

            <MetaData title={product.name_product} />
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-4 img-fluid p-4" id="product_image">
                    <Carousel pause='hover'>
                        {product.images && product.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <img className="d-block w-100" src={image.url} alt={product.title} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name_product}</h3>
                    <hr />

                    <div className="rating-outer">
                        <span id="no_of_reviews">{product.ratings}</span>
                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} đánh giá)</span>

                    <hr />
                    <p id="product_price" style={{ color: 'red' }} className="h6">{product.price_product}đ</p>
                    <div className="stockCounter d-inline">
                        <span className=" minus" onClick={downCount}>-</span>

                        <input type="number" className="count d-inline" value={count} readOnly />

                        <span className=" plus" onClick={upCount}>+</span>
                    </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-5" disabled={product.numOfReviews === 0} onClick={addToCart}>Thêm vào giỏ hàng</button>

                    <hr />

                    <p>Tình trạng hàng: <span id="stock_status" className={product.numOfReviews > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></p>

                    <hr />

                    <h4 className="mt-2">Mô tả:</h4>
                    <p>{product.describe}</p>
                    <hr />

                    {user.auth ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={() => {
                        setIsShowModal(true)

                        setUserRatings()


                    }}>
                        Bình luận sản phẩm
                    </button>
                        :
                        <div className="alert alert-danger mt-5" type='alert'>Bạn cần đăng nhập để có thể đánh giá được sản phẩm này.</div>
                    }


                    <CommentModal
                        isModalVisible={isShowModal}
                        handleCloseModal={CloseModal}
                        product={product}
                        

                    />
                </div>
                <div className="col-lg-2 product-policises flex-column d-flex align-items-start mt-5 container-fluid mr-3">

                    <div className="product-policises-top p-2">
                        <h5>Chính sách quyển lợi</h5>
                        <ul className="list-unstyled">
                            <li><img src="https://theme.hstatic.net/200000692099/1001033556/14/policy_product_image_1.png?v=30" className=""></img>100% hàng chính hãng</li>
                            <li><img src="https://theme.hstatic.net/200000692099/1001033556/14/policy_product_image_2.png?v=30"></img>Giá tốt nhất</li>
                            <li><img src="https://theme.hstatic.net/200000692099/1001033556/14/policy_product_image_3.png?v=30"></img>Hỗ trợ 24/7</li>
                            <li><img src="https://theme.hstatic.net/200000692099/1001033556/14/policy_product_image_4.png?v=30"></img>Ship toàn quốc</li>
                        </ul>
                    </div>
                    <div>
                        <img src="https://theme.hstatic.net/200000692099/1001033556/14/product_banner_img.jpg?v=30" width="100%" height="100%"></img>
                    </div>
                </div>
            </div>
            <div className='container'>
                {product.reviews && product.reviews.length > 0 && (
                    <ListReviews reviews={product.reviews} />

                )}
            </div>






        </>





    );



}
export default DetailProduct