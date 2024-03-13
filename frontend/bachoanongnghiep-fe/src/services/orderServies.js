import axios from 'axios'


const submitOrder = async (data) => {
    return axios.post("http://localhost:8001/order", data)
}

const submitDetail = async (data) => {

    return axios.post("http://localhost:8001/order_detail", data)

}

const getDetailOrder = (id) => {
    return axios.get(`http://localhost:8001/order_detail/${id}`)

}


const getOrderWithPhoneNumber = (phone) => {
    return axios.get(`http://localhost:8001/orderwithphone?phone=${phone}`);

}


const getaAllOrder = () => {
    return axios.get("http://localhost:8001/order")
}


const deleteOrder = (id) => {
    return axios.delete(`http://localhost:8001/order/${id}`)
}
const getMyOrder=(username)=>{

return axios.get(`http://localhost:8001/myorder?username=${username}`)


}


export { getMyOrder,submitDetail,getOrderWithPhoneNumber, submitOrder, getaAllOrder, getDetailOrder, deleteOrder }


