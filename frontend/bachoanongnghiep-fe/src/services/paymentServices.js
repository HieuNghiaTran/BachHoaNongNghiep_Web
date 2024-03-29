import axios from 'axios'

const paymentVNPay = (data) => {
    return axios.post("http://localhost:8001/create_payment_url", data)

}
const getResultPaymentVNpay = (data) => {
    return axios.get(`http://localhost:8001//payment/get_result${data}`)

}






export { paymentVNPay, getResultPaymentVNpay }