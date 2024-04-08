import { useState, useEffect, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import { getAllProduct, getProductDetail } from "../../services/productSevices";
import { debounce } from "lodash";
import _ from "lodash";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SubmitContext } from "../../context/submitContext";


const Search = () => {
    const [valueSearch, setValueSearch] = useState('');
    const { value } = useParams();
    const { onSubmit, offSubmit } = useContext(SubmitContext)
    const [listResults, setListResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(false)
    const [isShowResult, setIsShowResult] = useState(false);

    const [temp, setTemp] = useState(false)

    const history = useNavigate();

    const fetchData = async () => {
        try {
            let res = await getAllProduct();
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowResult = () => {
        setIsShowResult(!isShowResult)


    }


    const handleSearch = debounce(async (e) => {
        try {
            let value = e.target.value;
            const response = await getAllProduct();
            if (response && response.data) {
                let cloneListUser = response.data.filter(item => {
                    return item.name_product && typeof item.name_product === 'string' && 
                           value && typeof value === 'string' && 
                           item.name_product.toLowerCase().includes(value.toLowerCase());
                });
                setListResults(cloneListUser);
                setListResults.length === 0 ? setStatus(false) : setStatus(true);
                setIsShowResult(true);
            }
    
            if (!e.target.value) {
                setListResults([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, 200);
    



    return (
        <>
            <div className="d-flex flex-column ">
                <div className="search_bar">
                    <input type="text" className="search_loc" placeholder="Tìm kiếm sản phẩm"
                        onBlur={() => {
                            offSubmit()
                            listResults.length > 0 ? setTemp(true) : setTemp(false)
                        }}
                        onChange={(e) => {
                            setValueSearch(e.target.value)
                            onSubmit()
                            handleSearch(e);
                            handleShowResult();
                            console.log(listResults)
                        }}
                        onKeyPress={(e) => {

                            if (e.key === 'Enter') {
                                localStorage.setItem("search-value", e.target.value)
                                history(`/search/${e.target.value}`);

                            }
                        }}
                    />
                    <button onClick={() => { history(`/search/${valueSearch}`); }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>


                {isShowResult && temp && valueSearch != '' && (
                    <div className="result mt-3" onClick={() => { setIsShowResult(true) }}>
                        <div className="title" style={{ color: '#A0A0A0' }}>Kết quả tìm kiếm cho <span style={{ color: 'red' }}>"{valueSearch}"</span> </div>
                        <div className="list-result overflow-auto">
                            {listResults && listResults.length > 0 && status && listResults.map((item) => (
                                <Link to={`/product/${item._id}`}>
                                    <div key={item.id}>

                                        <div className="result-item d-flex">
                                            <div className="w-48 relative left" style={{ border: "none" }}>
                                                <img src={item.images[0].url} alt="" className="object-fill absolute inset-0 w-full h-full object-cover" width="67px" height="90px" loading="lazy" />
                                            </div>
                                            <div className="mx-3 right">
                                                <div className="product-name text-lg font-semibold text-slate-500">{item.name_product}</div>
                                                <div className="product-price" style={{ color: 'red' }}>{item.price_product}đ</div>
                                            </div>
                                        </div>
                                    </div>


                                </Link>
                            ))}

                        </div>

                        <button className="btn-show-on">Hiển thị một số sản phẩm chứa <span style={{ color: 'red' }}>{valueSearch}</span> </button>

                    </div>
                )}
            </div>


        </>

    );



}
export default Search;