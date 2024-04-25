import React, { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar"; // Import Sidebar component
import MetaData from "../../services/setHead"; // Import MetaData component (assuming it sets head data)
import TableProduct from "../tableProduct";
import { getAllProduct, getProductWithPage, getProductWithSearch } from "../../services/productSevices";
import { FaPlusCircle } from "react-icons/fa";
import ModalAddNewProduct from "../ModalsAddNewProduct";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const ProductManagerPage = () => {
    const [product, setProduct] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [value, setValue] = useState('')
    const { jwt, user } = useContext(AuthContext);

    const onSearch = async () => {
        if (value !== '') {
            let res = await getProductWithSearch(value)
            setProduct(res.data)

        }
        else {

            fetchData(1, perPage);


        }



    }


    const handlePageClick = async (e) => {
        const currentPage = e.target.textContent;
        fetchData(currentPage, perPage);
    }

    const CloseModal = () => {

        setIsShowModal(false)

    }
    useEffect(() => {

        fetchData(1, perPage);
    }, [perPage]);

    const fetchData = async (page, perPage) => {
        try {
            let res = await getProductWithPage(page, perPage);
            setProduct(res.data.docs);
            setTotalPages(res.data.totalPages);



        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="grid-bg ba-grid anim">
                <div className="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>
                        <div className=" col-12 col-md-10 text-center">
                            <div className="d-flex justify-content-between">
                                <h1 className="fw-bold">Quản lý sản phẩm</h1>
                                <div className="m-auto" style={{ flexBasis: "40%" }}><Search
                                    placeholder="Nhập tên sản phẩm"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        onSearch()
                                    }}
                                    width={400}
                                    onSearch={onSearch}
                                />


                                </div>


                                <div style={{ marginBottom: "auto", marginTop: "auto" }}>
                                    <button type="button" class="btn btn-danger " style={{ margin: "auto" }}

                                        onClick={() => {
                                            setIsShowModal(true)

                                        }}
                                    >
                                        <span cla ssName="mx-2"><FaPlusCircle /></span>
                                        Thêm sản phẩm</button>

                                </div>

                            </div>
                            <Fragment>
                                <MetaData title={'Product Manager'} />

                                <div className="row pr-4">
                                    {product && product.length > 0 && (
                                        <TableProduct product={product} />
                                    )}
                                </div>
                            </Fragment>
                            <div className='row'>
                                <div className='col-md-6'>
                                    {/* Content for the left half */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pageginate'>
                <Stack spacing={2}>
                    <Pagination count={totalPages} color="success"

                        onChange={handlePageClick}
                        pageCount={totalPages}


                    />
                </Stack>
            </div>

            <ModalAddNewProduct
                isModalVisible={isShowModal}
                handleCloseModal={CloseModal}


            />

        </>
    );
}

export default ProductManagerPage;
