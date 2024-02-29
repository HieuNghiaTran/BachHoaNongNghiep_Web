import axios from 'axios'


const submitOrder =async(data)=>{

return axios.post("http://localhost:8001/order", data) 
}

const submitDetail=async(data)=>{

 return axios.post("http://localhost:8001/order_detail", data) 

}


const getaAllOrder =()=>{
return axios.get ("http://localhost:8001/order")
}

export  {submitDetail,submitOrder, getaAllOrder}


