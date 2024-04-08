import _ from "lodash";
import { debounce } from "lodash";
import './ccs/ProductWithCatory.scss'
import Products from "../components/layout/products";
import Form from 'react-bootstrap/Form';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header'
import History from '../components/layout/history';
import { GrFormNextLink } from "react-icons/gr";
import { useEffect, useState } from 'react';
import getAllColecion from '../services/collectionsServices';
import { getProductWithCatory } from '../services/productSevices';
import MetaData from '../services/setHead';
import ReactPaginate from 'react-paginate';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaPagelines } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Input, Radio, Space } from 'antd'
import Loader from "../components/layout/Loader";
import Chat from "../components/layout/chat";
import AppChat from "../components/layout/appchat";

const ProductWithCatoryPage = () => {
    const { category_id } = useParams();
    const [product, setProduct] = useState([]);
    const [listColection, setListCollection] = useState([]);
    const [pageCount, setPageCount] = useState(5);
    const [nameCategory, setNameCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [az, setAz] = useState(false)
    const [za, setZa] = useState(false)
    const [esc, setEsc] = useState(false)
    const [desc, setDesc] = useState(false)
    const [valuePrice, setValuePrice] = useState(1);
    const [valueColection, setValueCollection] = useState('');
    const handlePageClick = () => {
    }

    useEffect(() => {
        setLoading(true)
        let isMount = true
        if (isMount) {
            fetchDataColection();
            fetchProductColection();

            switch (category_id) {
                case '658d71c7bdf16aee6ce16344':
                    setNameCategory("Thuốc bảo vệ thực vật");
                    break;
                case '658d7164bdf16aee6ce1633c':
                    setNameCategory("Gạo");
                    break;
                case '658d7192bdf16aee6ce16342':
                    setNameCategory("Hạt giống");
                    break;
                case '658d7170bdf16aee6ce1633e':
                    setNameCategory("Phân bón");
                    break;
                case '658d7182bdf16aee6ce16340':
                    setNameCategory("Linh kiện Drone");
                    break;
                default:
                    setNameCategory("Unknown category");
                    break;
            }
        }
        setLoading(false)
        return () => {
            isMount = false;
        };


    }, []);




    const onChangePrice = (e) => {
        setLoading(true)
        setValuePrice(e.target.value);
        fillerPrice(e.target.value)
        setLoading(false)
    };
    const onChangeCollection = (e) => {
        setLoading(true)
        setValueCollection(e.target.value);
        fillerCollection(e.target.value)
        setLoading(false)
    };




    const fillerCollection = async (id_colection) => {
        var res = await getProductWithCatory(category_id);
        var temp = res.data.filter((item) => item.id_collection === id_colection)
        setProduct(temp)

    }
    const fillerPrice = async (value) => {
        try {
            let res;
            switch (value) {
                case '1':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) < 100000));
                    break;
                case '2':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) >= 100000 && parseInt(item.price_product) < 200000));
                    break;
                case '3':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) >= 200000 && parseInt(item.price_product) < 300000));
                    break;
                case '4':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) >= 300000 && parseInt(item.price_product) < 500000));
                    break;
                case '5':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) >= 500000 && parseInt(item.price_product) < 1000000));
                    break;
                case '6':
                    res = await getProductWithCatory(category_id);
                    setProduct(res.data.filter(item => parseInt(item.price_product) >= 1000000));
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };










    const selected = (item) => {

        switch (item) {
            case 'a-z':
                setAz(true)
                setZa(false)
                setEsc(false)
                setDesc(false)
                break;
            case 'z-a':
                setAz(false)
                setZa(true)
                setEsc(false)
                setDesc(false)
                break;
            case 'esc':
                setAz(false)
                setZa(false)
                setEsc(true)
                setDesc(false)
                break;
            case 'desc':
                setAz(false)
                setZa(false)
                setEsc(false)
                setDesc(true)
                break;

            default:
                setAz(false)
                setZa(false)
                setEsc(false)
                setDesc(false)
                break;
        }


    }



    const Sort = (mode) => {
        setLoading(true)
        selected(mode)
        switch (mode) {
            case 'z-a':
                var temp = product.sort((a, b) => {
                    if (!a.name_product || !b.name_product) return 0;
                    return b.name_product.localeCompare(a.name_product);

                });
                setProduct(temp);
                break;
            case 'a-z':
                var temp = product.sort((a, b) => {
                    if (!a.name_product || !b.name_product) return 0;
                    return a.name_product.localeCompare(b.name_product);

                });
                setProduct(temp);
                break;
            case 'esc':
                var temp = product.sort((a, b) => a.price_product - b.price_product)
                setProduct(temp)
                break;
            case 'desc':
                var temp = product.sort((a, b) => b.price_product - a.price_product)
                setProduct(temp)
                break;

            default:

                break;
        }
        setLoading(false)

    }





    const fetchDataColection = async () => {
        try {
            let res = await getAllColecion(category_id);

            setListCollection(res.data);
            console.log(res)
        } catch (err) {
            console.log(err);
        }
    };



    const fetchProductColection = async () => {
        try {
            let res = await getProductWithCatory(category_id);

            setProduct(res.data)

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <MetaData title={nameCategory} />
            <Header />
            {loading ? <Loader /> :
                <div className="main">
                    <div><History data={"Trang chủ / Danh Mục /"} last_item={nameCategory} /></div>
                    <div className="h3  mb-3 px-5 my-3" style={{ fontFamily: "'Roboto', sans-serif" }}>Mô tả</div>
                    <div className="mb-3 px-5" style={{ fontFamily: "'Roboto', sans-serif" }}>{nameCategory}</div>
                    <div className="container d-flex">
                        <div className="colections-container-left px-3 mx-3 col-md-2">
                            <div className="colections-container-left-top">
                                <div className='fw-bold mb-2'>MỨC GIÁ</div>
                                <Radio.Group onChange={onChangePrice} value={valuePrice}>
                                    <Space direction="vertical">
                                        <Radio value={"1"} className='fw-bold my-1'>Giá dưới 100.000đ</Radio>
                                        <Radio value={"2"} className='fw-bold my-1'>100.000đ-200.000đ</Radio>
                                        <Radio value={"3"} className='fw-bold my-1'>200.000đ-300.000đ</Radio>
                                        <Radio value={"4"} className='fw-bold my-1'>300.000đ-500.000đ</Radio>
                                        <Radio value={"5"} className='fw-bold my-1'>300.000đ-500.000đ</Radio>
                                        <Radio value={"6"} className='fw-bold my-1'>Trên 1.000.000đ</Radio>

                                    </Space>
                                </Radio.Group>


                            </div>
                            <div className="colections-container-left-bottom">
                                <div className='fw-bold my-2'>LOẠI</div>
                                <div>
                                    <Radio.Group onChange={onChangeCollection} value={valueColection}>
                                        {listColection &&
                                            listColection.length > 0 &&
                                            listColection.map((item, index) => (
                                                <Space direction="vertical" key={item.id_catory}>
                                                    <Radio value={item._id} className='fw-bold my-1'>{item.colection}</Radio>
                                                </Space>
                                            ))}
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="colections-container-right px-3 col-md-10">
                            <div className='h2 fw-bold mb-4' style={{ fontFamily: "'Roboto', sans-serif" }} >{nameCategory}</div>


                            <div className='d-flex colections-container-right-header pb-2 mb-3'>
                                <div className='mx-3'>Sắp xếp: </div>

                                <div className={az ? "mx-3 text-dark fw-bold" : "mx-3"} style={{ color: '#898989' }} onClick={() => { Sort('a-z') }}>Tên A <span><GrFormNextLink /></span> Z</div>
                                <div className={za ? "mx-3 text-dark fw-bold" : "mx-3"} style={{ color: '#898989' }} onClick={() => { Sort('z-a') }}>Tên Z <span><GrFormNextLink /></span> A</div>
                                <div className={esc ? "mx-3 text-dark fw-bold" : "mx-3"} style={{ color: '#898989' }} onClick={() => { Sort('esc') }}>Giá tăng dần</div>
                                <div className={desc ? "mx-3 text-dark fw-bold" : "mx-3"} style={{ color: '#898989' }} onClick={() => { Sort('desc') }}>Giá giảm dần</div>


                            </div>

                            <div className="result-page col-6 col-md-12">

                                <div className='container row'>
                                    {product.length > 0 && product.map((item) => (
                                        <Products key={item._id} product={item} col={3} />
                                    ))}

                                </div>

                            </div>
                            <div className='pageginate'>
                                <Stack spacing={2}>
                                    <Pagination count={pageCount} color="success"
                                        onPageChange={handlePageClick}

                                    />
                                </Stack>
                            </div>
                        </div>

                    </div >
                </div >
            }
            <AppChat/>
            <Footer />
        </>
    );
};

export default ProductWithCatoryPage;

