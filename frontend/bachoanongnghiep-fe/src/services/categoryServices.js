import axios from 'axios'


const getAllCategory  =()=>{
    return axios.get(`http://localhost:8001/category`)
}



const getCategoryWithId=(id)=>{


return axios.get(`http://localhost:8001/category/${id}`)

}

export  {getAllCategory, getCategoryWithId}