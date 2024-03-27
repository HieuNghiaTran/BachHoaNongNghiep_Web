import axios from 'axios';

const addNewUser =(data) => {

   return axios.post('http://localhost:8001/user',data);
  
};

const LoginAdminUser = (email,pass) => {
  return axios.get(`http://localhost:8001/admin/login?email=${email}&password=${pass}`);
}


const getAllUser =async ()=>{
return axios.get("http://localhost:8001/user")
}


const getUser = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8001/user/detail?${query}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};



const getDetailUser = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8001/user/detail/login${query}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export { addNewUser, getDetailUser, getAllUser,LoginAdminUser, getUser  };
