import React, { Fragment, useEffect, useState } from "react"; // Import React and Fragment
import Sidebar from "../sidebar"; // Import Sidebar component
import MetaData from "../../services/setHead"; // Import MetaData component (assuming it sets head data)
import TableProduct from "../tableProduct";
import { getAllProduct, getProductWithPage } from "../../services/productSevices";
import { FaPlusCircle } from "react-icons/fa";
import ModalAddNewProduct from "../ModalsAddNewProduct";



import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaPagelines } from 'react-icons/fa';


const ProductManagerPage = () => {
    const [product, setProduct] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [pageCount, setPageCount] = useState(5)
    
    const [currentPage, setCurrentPage] = useState(0);
    const { perPage, setPerPage } = useState(5)
    const handlePageClick = async (e) => {
        const currentPage = e.target.textContent;
            fetchData(currentPage,5);


    }

    const CloseModal = () => {

        setIsShowModal(false)

    }
    useEffect(() => {
        fetchData(1, 5);
    }, []);

    const fetchData = async (page, perPage) => {
        try {
            const res = await getProductWithPage(page, perPage);
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
                        <div className="col-12 col-md-3">
                            <Sidebar />
                        </div>
                        <div className=" col-12 col-md-9">
                            <div className="d-flex justify-content-between">
                                <h1 className="">Quản lý sản phẩm</h1>
                                <div >
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
                                    <TableProduct
                                        product={product}

                                    />
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
                    <Pagination count={pageCount} color="success"

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
