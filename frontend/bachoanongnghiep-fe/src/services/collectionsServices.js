import axios from 'axios'


const getAllColecion  =(id)=>{
    return axios.get(`http://localhost:8001/collection/${id}`)
}


export default getAllColecion