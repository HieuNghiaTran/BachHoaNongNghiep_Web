import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from "chart.js";

import { Doughnut, Line, Radar } from "react-chartjs-2";
import Sidebar from "../sidebar"
import { Link } from "react-router-dom";
import MetaData from "../../services/setHead";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../services/userServices";
import { getAllProduct } from "../../services/productSevices";
import { getaAllOrder } from "../../services/orderServies";
import Loader from "../../components/layout/Loader";
import { getAllCategory } from "../../services/categoryServices";
import Footer from "../../components/layout/footer";


const DashBoard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(PointElement);
    ChartJS.register(LineElement);
    ChartJS.register(RadialLinearScale);
    const [users, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [totalAmount, setTotalAmount] = useState(453000)
    const [listCategory, setListCategoty] = useState([])
    const [loading, setLoading] = useState(false);
    const data = {
        labels: listCategory,
        datasets: [{
            label: 'Danh mục sản phẩm',
            data: [],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    //const dispatch = useDispatch();

    //const { users } = useSelector(state => state.allUsers)
    //const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // status order    let da_dat_hang = 0;
    let dang_van_chuyen = 0;
    let da_giao_hang = 0;
    let da_dat_hang = 0;
    orders &&
        orders.forEach((order) => {
            if (order.status === "Đã đặt hàng") {
                da_dat_hang += 1;
            }
            if (order.status === "Đang vận chuyển") {
                dang_van_chuyen += 1;
            }
            if (order.status === "Đã giao hàng") {
                da_giao_hang += 1;
            }
        });

   







    let totalAmountall = 0;
    orders &&
    orders.forEach((product) => {
      totalAmountall += product.total;
    });
    // Chart Line tính tổng doanh thu
    const lineState = {
        labels: ["Số tiền ban đầu", "Tổng danh thu hiện tại"],
        datasets: [
            {
                label: "TỔNG DANH THU",
                backgroundColor: ["green"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmountall],
            },
        ],
    };
    // Doughnut tính số lượng hàng còn và hết hàng
    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    // Doughnut thống kê trạng thái đơn hàng
    const doughnutStateOrder = {
        labels: ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700"],
                data: [da_dat_hang, dang_van_chuyen, da_giao_hang],
            },
        ],
    };
    useEffect(async () => {
        setLoading(false);
        let category = await getAllCategory();
        category.data.forEach((element) => {
          listCategory.push(element.category);
        });
      
        let user = await getAllUser();
        setUser(user.data);
      
        let product = await getAllProduct();
        setProducts(product.data);
      
        let order = await getaAllOrder();
        setOrders(order.data);
      
        setLoading(false);
        return () => {};
      }, []);
      




    return (

       
        <>

            <div class="grid-bg ba-grid anim">
                <div class="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <h1 className="my-4 text-center bold mb-3">Tổng quan</h1>

                            {loading ? <Loader /> : (
                                <>
                                    <MetaData title={'Admin Dashboard'} />

                                    <div className="row pr-4">
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-primary o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng danh thu<br /> <b>{totalAmountall && totalAmountall.toLocaleString()} VNĐ</b>
                                                    </div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-success o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng sản phẩm<br /> <b>{products && products.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-danger o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng đơn hàng<br /> <b>{orders && orders.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-info o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng người dùng<br /> <b>{users.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>Tình trạng số lượng hàng</h6>
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutState} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">

                                                    <h6 className='text-dark'>Tình trạng đơn hàng</h6>

                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutStateOrder} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-sm-12 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <h6 className='text-dark'>Tổng doanh thu</h6>

                                                    <div className="lineChart">
                                                        <Line
                                                            data={lineState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}

                            <div className='row'>

                                <div className='col-md-6'>
                                </div>


                                <div className='radar col-md-5 card text-white bg-light'>

                                    <div className="lineChart">
                                        <Radar
                                            data={data}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
<Footer/>

        </ >



    )



}
export default DashBoard