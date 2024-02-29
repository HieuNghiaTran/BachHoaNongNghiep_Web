import { useContext, useState, useEffect } from "react";
import Header from "../components/layout/header";
import MetaData from "../services/setHead";
import { historyContext } from "../context/historyContext";
import History from '../components/layout/history';
import Products from "../components/layout/products";
import { getAllProduct, getProductDetail, getProductWithSearch } from "../services/productSevices";

import './ccs/ResultSearch.scss'
const ResultSearch = (props) => {
const value=props
const {listHistory}=useContext(historyContext)
const [products, setProducts] = useState([]);


useEffect(() => {
    fetchData(localStorage.getItem('search-value'));
    
  }, []);

  const fetchData = async (value) => {
    try {
      let res = await getProductWithSearch(value);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };


return (
<>
<Header />
<History/>
<MetaData title={`Kết quản tìm kiếm "${localStorage.getItem('search-value')}"`} />

<div>

    <div className="h4 p-2">CÓ {products.length} KẾT QUẢ TÌM KIẾM PHÙ HỢP</div>



    <div className="result-page d-flex ">
    {products && products.length > 0 && products.map((product) => (
    <Products key={product._id} product={product} col={2} />
    ))}
    </div>
</div>




</>




);

}
export default ResultSearch;