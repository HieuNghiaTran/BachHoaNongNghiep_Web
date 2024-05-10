import { useContext, useState, useEffect } from "react";
import Header from "../components/layout/header";
import MetaData from "../services/setHead";
import History from '../components/layout/history';
import Products from "../components/layout/products";
import { getProductWithSearch } from "../services/productSevices";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './ccs/ResultSearch.scss'
import Footer from "../components/layout/footer";
import AppChat from "../components/layout/appchat";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
const ResultSearch = () => {
  const [totalPages, setTotalPages] = useState(3);
  const [products, setProducts] = useState([]);
  const [laoding, setLoading] = useState(false)

  const { value } = useParams()

  useEffect(() => {
    fetchData(value);
    setTotalPages(Math.trunc(products.length / 12))

  }, [value]);

  const handlePageClick = async (e) => {
    const currentPage = e.target.textContent;


  }





  const fetchData = async (value) => {
    try {
      setLoading(true)
      let res = await getProductWithSearch(value);
      setProducts(res.data);
      setLoading(false)

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Header />
      <div><History data={"Trang chủ / "} last_item={`Tìm kiếm`} /></div>

      <MetaData title={`Kết quản tìm kiếm "${localStorage.getItem('search-value')}"`} />

    {laoding ? <Loader /> :
      <><div className="col-md-10 m-auto p-5" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
        {products.length > 0 ?
          <>
            <div className="h4 my-2 fw-bold mb-2">Có {products.length} kết quả tìm kiếm phù hợp</div>
            <div className="result-page d-flex row">
              {products && products.length > 0 && products.map((product) => (
                <Products key={product._id} product={product} col={3} />
              ))}
            </div></>
          :
          <>
            <div className="d-flex justify-content-center align-item-center m-auto fw-bold my-5"><div>KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO VỚI TỪ KHÓA TRÊN</div></div>
          </>


        }
      </div>

      <div className='pageginate'>
        <Stack spacing={2}>
          <Pagination count={totalPages} color="success"

            onChange={handlePageClick}
            pageCount={totalPages}


          />
        </Stack>
      </div>
</>

}


      <AppChat />



      <Footer />

    </>




  );

}
export default ResultSearch;