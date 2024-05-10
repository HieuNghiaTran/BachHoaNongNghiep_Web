import { useEffect, useState } from "react";
import CountDown from "./countDown";
import { getProductHotDeal } from "../../services/productSevices";
import Slider from "react-slick";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import ProductsHot from "./productHotDeal";
const HotDeal = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getProductHotDeal();
            setProducts(res.data.docs);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 p-4" style={{ background: "#ffc107" }}>
            <div className="col-md-11 m-auto p-2" style={{ background: "#fff", borderRadius: "6px" }}>
                <div className="d-flex">
                    <span><h2 style={{ fontWeight: "bold" }}> Sản phẩm mới ra mắt</h2></span>
                    <span className="countdown mt-auto mb-auto mx-3">
                        <span style={{ color: "#666666" }}>Kết thúc sau: </span>
                        <span className="m-auto"><CountDown /></span>
                    </span>
                </div>
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index} className="">
                                    <ProductsHot product={product} col={11} />


                                    


                                </div>
                            ))}
                        </Slider>
                    )}
                    <div className=" d-flex justify-content-center align-item-center"><Link to={"/collections/658d7164bdf16aee6ce1633c"}><button className="btn btn-outline-success">Xem tất cả</button></Link></div>
                </div>
            </div>
        </div>
    );
};

export default HotDeal;
