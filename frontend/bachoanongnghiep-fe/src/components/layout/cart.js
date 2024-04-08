import { useContext, useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../../context/cartContext";
import { MdHighQuality } from "react-icons/md";
import { Link } from 'react-router-dom'
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);

  const pt = useSelector(state => state.cartProvider);

  useEffect(() => {
    setProductItem(pt.listCart);
    handleCalculate();
  }, [pt.listCart]);

  const handleShowCart = () => {
    setIsShowCart(!isShowCart);
    handleCalculate();

  };

  const handleCalculate = () => {
    let temp = 0;
    pt.listCart.forEach(element => {
      temp += parseFloat(element.price_product) * element.quantity;
    });
    setTotal(temp);


  };


  return (
    <>


      <div className="position-relative col-md-11" style={{ marginRight: "5rem" }} >
        <button className="btn_cart btn btn-outline-success p-0 mx-2" onClick={handleShowCart}  >
          <div className="d-flex">
            <span className="h3 mx-1"><IoBagHandleOutline /> </span>
            <span className="m-auto">Giỏ hàng</span>
            <span className="m-auto px-1">{productItem.length > 0 && (<div className="total_product_cart px-1" style={{ borderRadius: "4px" }}>{productItem.length}</div>)}</span>
          </div>

        </button>

        {isShowCart && (

          (productItem.length > 0 ? (<div className="list-cart-from-icon position-fixed col-3 mt-3">
            <div className="top_cart">
              {productItem.map((item) => (

                <div className="product-item-from-cart-icon d-flex" key={item.id}>
                  <div className="product-item-from-cart-icon-left">
                    <img
                      src={item.images[0].url}
                      alt="Product"
                      className=""
                    />
                  </div>
                  <div className="product-item-from-cart-icon-right">
                    <div className="name">{item.name_product}</div>
                    <div className="price" style={{ color: "red" }}>
                      {item.price_product}<span className="sl"> x {item.quantity}</span>
                    </div>
                  </div>
                </div>


              ))}
            </div>
            <div className="list-cart-from-icon-botton">
              <div className="total-cost-from-cart-icon">
                Tổng tiền tạm tính:<span style={{ color: "red" }}> {total}đ</span>
              </div>
              <div className="btn-div">
                <button className="btn-payment"> <Link to="/cart" style={{ color: '#fff' }}>Tiến hành thanh toán</Link></button>
              </div>
            </div>
          </div>) : (<div className="list-cart-from-icon position-fixed col-3 mt-3  d-flex justify-content-center align-item-center">Không có sản phẩm nào.</div>))


        )}

      </div>
    </>
  );
};

export default Cart;
