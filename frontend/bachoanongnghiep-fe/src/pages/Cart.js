import { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { CartContext } from '../context/cartContext';
import MetaData from '../services/setHead';
import Header from '../components/layout/header';
import './ccs/cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import History from '../components/layout/history';
import { historyContext } from '../context/historyContext';
import { addCart, deleteCart, downItem } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
const CartPage = (props) => {
    const pt = useSelector(state => state.cartProvider)
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(1);
    const [productItem1, setProductItem1] = useState([])
    const { listHistory } = useContext(historyContext)
    const dispatch = useDispatch();

    useEffect(() => {
        setProductItem1(pt.listCart)

    }, [pt.listCart]);



    const upCount = (item) => {
        setCount(count + 1);
        let data = {
            id: item.id,
            id_category: item.id_category,
            name_product: item.name_product,
            price_product: item.price_product,
            images: item.images,
            product_id: item.id_product,

        }
        let temp = addCart(data)
        dispatch(temp);
    }

    const downCount = (item) => {


        if (item.quantity > 1) {

            setCount(count - 1)

            let data = new FormData();
            data = {
                id: item.id


            }
            dispatch(downItem(data))

        };

    }

    const handleaSubmit = () => {
        // Submit logic
    }

    const handleDeleteItem = (id) => {
        let action = deleteCart(id);
        dispatch(action);
    }

    return (
        <>
            <Header />
            <History />
            <MetaData title={"My-oder"} />
            <div className='my-cart'>

                <div className="top-cart d-flex justify-content-center align-item-center row">



                    <div className="top-left-cart col-md-6">
                        <div className='h3 mb-2'>Giỏ hàng của tôi</div>
                        <div className='table-product'>
                            <Table striped bordered hover>
                                <tbody>
                                    {productItem1 && productItem1.length > 0 && productItem1.map((item, index) => (
                                        <tr key={index} className='text-center justify-content-center'>
                                            <td><button className='btn btn-delete' onClick={() => handleDeleteItem(item._id)}>Xoá</button></td>
                                            <td><img src={item.images[0].url} alt={item.name_product} style={{ width: '6rem' }} /></td>
                                            <td>{item.name_product}</td>
                                            <td>{item.price_product}</td>
                                            <td>
                                                <div className="stockCounter d-inline">
                                                    <span className="minus" onClick={() => downCount(item)}>-</span>
                                                    <input type="number" className="count d-inlien" value={item.quantity} readOnly />
                                                    <span className="plus" onClick={() => upCount(item)}>+</span>
                                                </div>
                                            </td>
                                            <td>{item.price_product * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                    <div className="top-right-cart col-md-6">
                        <p>Số lượng:  <span className="order-summary-values">{productItem1.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Sản phẩm)</span></p>
                        <div className='total d-flex justify-content-between'>Tổng tiền là:<span style={{ color: 'red', fontWeight: 'bold' }}>{productItem1.reduce((acc, item) => (acc + item.price_product * item.quantity), 0)} đ</span></div>
                        <div className='btn-are mt-3'><button className="btn_payment btn" onClick={handleaSubmit}><Link to={"/checkouts/:id"} style={{ color: "#fff" }}>Tiến hành đặt hàng</Link></button></div>
                        <div className='mt-2 back-top-buy text-center'><button className="btn"><Link to={"/trang-chu"} style={{ color: "#666666" }} className='back-link'><span><IoIosArrowRoundBack /></span>Tiếp tục mua hàng</Link></button></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;
