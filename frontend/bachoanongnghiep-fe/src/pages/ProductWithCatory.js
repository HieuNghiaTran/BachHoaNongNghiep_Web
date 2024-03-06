
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


const ProductWithCatoryPage = () => {
    const { category_id } = useParams();
    const [product, setProduct] = useState([]);
    const [listColection, setListCollection] = useState([]);
    const [pageCount, setPageCount] = useState(5);
    const [nameCategory, setNameCategory] = useState('')
    const handlePageClick = () => {
    }

    useEffect(async () => {

        fetchDataColection();
        fetchProductColection();
        switch (category_id) {
            case '658d71c7bdf16aee6ce16344':{setNameCategory("Thuốc bảo vệ thực vật")}
            case '658d7164bdf16aee6ce1633c':{setNameCategory("Gạo")}
            case '658d7192bdf16aee6ce16342':{setNameCategory("Hạt giống")}
            case '658d7170bdf16aee6ce1633e':{setNameCategory("Phân bón")}
            case '658d7182bdf16aee6ce16340':{setNameCategory("Linh kiện Drone")}



    }
    }, []);




    const fetchDataColection = async () => {
        try {
            let res = await getAllColecion(category_id);

            setListCollection(res.data);
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
            <MetaData title={"Sản Phẩm"} />
            <Header />
            <div className="main">
                <div><History data={"Trang chủ / Danh Mục /"} last_item={nameCategory} /></div>
                <div className="h3  mb-3 px-5 my-3" style={{ fontFamily: "'Roboto', sans-serif" }}>Mô tả</div>
                <div className="mb-3 px-5" style={{ fontFamily: "'Roboto', sans-serif" }}>Thuốc bảo vệ thực vật</div>
                <div className="container d-flex">
                    <div className="colections-container-left px-3 mx-3 col-md-2">
                        <div className="colections-container-left-top">
                            <div>MỨC GIÁ</div>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={type} className="mb-3">
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={type} className="mb-3">
                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'Giá dưới 100.000đ'}</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'100.000đ - 200.000đ'}</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'200.000đ - 300.000đ'}</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'300.000đ - 500.000đ'}</Form.Check.Label>
                                                    </Form.Check>


                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'500.000đ - 1.000.000đ'}</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check type={type} id={`check-api-${type}`}>
                                                        <Form.Check.Input type={type} isValid />
                                                        <Form.Check.Label>{'Trên 1.000.000đ'}</Form.Check.Label>
                                                    </Form.Check>
                                                </div>
                                            ))}
                                        </Form>
                                    </div>
                                ))}
                            </Form>
                        </div>
                        <div className="colections-container-left-bottom">
                            <div>LOẠI</div>
                            <div>
                                <Form>
                                    {listColection &&
                                        listColection.length > 0 &&
                                        listColection.map((item) => (
                                            <Form.Check
                                                key={item.id}
                                                type={'checkbox'}
                                                id={`check-api-checkbox-${item.id}`}
                                            >
                                                <Form.Check.Input type={'checkbox'} isValid />
                                                <Form.Check.Label>{item.colection}</Form.Check.Label>
                                            </Form.Check>
                                        ))}
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="colections-container-right px-3 col-md-10">
                        <div className='h2' style={{ fontFamily: "'Roboto', sans-serif" }} >Thuốc bảo vệ thực vật</div>


                        <div className='d-flex colections-container-right-header pb-2'>
                            <div className='mx-3'>Sắp xếp: </div>

                            <div className='mx-3' style={{ color: '#898989' }}>Tên A <span><GrFormNextLink /></span> Z</div>
                            <div className='mx-3' style={{ color: '#898989' }}>Tên Z <span><GrFormNextLink /></span> A</div>
                            <div className='mx-3' style={{ color: '#898989' }}>Giá tăng dần</div>
                            <div className='mx-3' style={{ color: '#898989' }}>Giá giảm dần</div>


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

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductWithCatoryPage;

