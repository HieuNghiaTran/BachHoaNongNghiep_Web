import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/layout/header";
import { getAllProduct, getProductDetail, postReview } from "../services/productSevices";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../services/setHead";
import Carousel from 'react-bootstrap/Carousel';
import './ccs/product_detail.scss'
import { toast } from 'react-toastify';
import { UserContext } from "../context/userContext";
import CommentModal from "../components/layout/ModalsComment"
import { addCart, updateCart } from "../redux/actions/cartActions";
import ListReviews from "../components/layout/listReview";
import History from "../components/layout/history";
import Footer from "../components/layout/footer";
import { SubmitContext } from "../context/submitContext";
import socketIOClient from "socket.io-client";
const DetailProduct = (props) => {
    const dispatch = useDispatch();

    const { submit, onSubmit, offSubmit } = useContext(SubmitContext)
    const [product, setProducts] = useState({});
    const { id } = useParams();
    const [count, setCount] = useState(1);
    const [isShowModal, setIsShowModal] = useState(false)
    const { user, logOut, jwt } = useContext(UserContext);
    

    const socketRef = useRef();

    let [Review, setReview] = useState([])

    useEffect(() => {

        fetData(id);


    }, [id])
    useEffect(() => {

            socketRef.current = socketIOClient.connect("http://localhost:8001")

            socketRef.current.on('newComment', dataGot => {
                Review.unshift(dataGot)        
    
            })
    
            return () => {
                socketRef.current.disconnect();
            };


        
    }, []);

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
            images: product.images,

        }

      if(count>1){
        for(let i=0;i<count;i++){
            dispatch(addCart(data))

            
        }
      }else{
        dispatch(addCart(data))
}
        
        toast.success("Đã thêm vào giỏ hàng!");
   

    }



    return (
        <>
            <Header />
            <div><History data={"Trang chủ / "} last_item={`Sản phẩm`} /></div>
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
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-5" disabled={product.stock === 0} onClick={addToCart}>Thêm vào giỏ hàng</button>

                    <hr />

                    <p>Tình trạng hàng: <span id="stock_status" className={product.numOfReviews > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></p>

                    <hr />

                    <h4 className="mt-2">Mô tả:</h4>
                    <p>{product.describe}</p>
                    <hr />

                    {jwt && user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={() => {
                        setIsShowModal(true)

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
                    <ListReviews reviews={product.reviews}
                        newReview={Review}
                    />

                )}
            </div>
            <Footer />





        </>





    );



}
export default DetailProduct