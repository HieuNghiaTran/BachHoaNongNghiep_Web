
import { Link } from 'react-router-dom'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { addCart } from '../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import cartReducer from '../../redux/Reducer/cartReducer';
import ReducerRoot from '../../redux/rootReducer';
const Products = ({ product, col }) => {
    const { handleAddToCart, productItem } = useContext(CartContext);

    const [pr, setpr] = useState([])
    const dispatch = useDispatch();
    const pt = useSelector(state => state.cartProvider)
    const add = () => {

        //handleAddToCart(product._id, product.id_category, product.name_product, product.price_product, product.images)


        let data = new FormData();

        data = {
            id: product._id,
            id_category: product.id_category,
            name_product: product.name_product,
            price_product: product.price_product,
            images: product.images

        }
        const a = addCart(data)
        dispatch(a)
     
       

        toast.success("Đã thêm vào giỏ hàng !");
    }

    return (
        <div className={`product-item col-sm-12 col-md-6 col-lg-${col} my-2 mx-1`}>
            <div className=" card card p-3 rounded">
                <Link to={`/product/${product._id}`}><img className="card-img-top m-auto" src={product.images[0].url} alt='' /></Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name_product}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} đánh giá)</span>
                    </div>
                    <p className="card-text" style={{ color: 'red' }}>{(product.price_product).toLocaleString()}đ</p>
                    <div class="container">
                        <div class="row">

                            <div id="view_btn" className="btn btn-block" onClick={() => {
                                add();

                            }}><MdOutlineAddShoppingCart /><span>&nbsp;</span>Chọn Mua</div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );


}

export default Products;