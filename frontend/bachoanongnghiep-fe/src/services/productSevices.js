import axios from 'axios'


const getAllProduct = () => {
    return axios.get('http://localhost:8001/product')
}
const getProductHotDeal = () => {
    return axios.get('http://localhost:8001/productsHodeal')
}

const getProductDetail = (id) => {
    return axios.get(`http://localhost:8001/product/${id}`);

}

const getProductWithSearch = (value) => {
    return axios.get(`http://localhost:8001/product/search/${value}`);
}



const getProductWithCatory = (value) => {
    return axios.get(`http://localhost:8001/products/${value}`);
}

const addNewProduct = (data) => {
    console.log(data)
    return axios.post("http://localhost:8001/product/", data)
}

const deleteProduct = (id) => {

    return axios.delete(`http://localhost:8001/product/${id}`)

}


const updateProduct = (id, data) => {

    return axios.put(`http://localhost:8001/product/${id}`, data)
}

const getProductWithPage = (page, perpage) => {
    return axios.get(`http://localhost:8001/product/getwithpage?page=${page}&perPage=${perpage}`)
}


const getProductWithCategoryPageginate = (page, perpage, id) => {
    return axios.get(`http://localhost:8001/pageginateProductCategory?id=${id}&page=${page}&perPage=${perpage}`)
}


const postReview = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.put("http://localhost:8001/products/review", data, config)

}




export { getProductWithCategoryPageginate, addNewProduct, getAllProduct, getProductDetail, getProductWithSearch, getProductWithCatory, deleteProduct, updateProduct, getProductWithPage, postReview, getProductHotDeal }