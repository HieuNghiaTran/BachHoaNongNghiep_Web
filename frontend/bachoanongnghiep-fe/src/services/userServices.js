import axios from 'axios';

const addNewUser =(data) => {

   return axios.post('http://localhost:8001/user/',data);
  
};


const getAllUser =async ()=>{
return axios.get("http://localhost:8001/user")
}

const getDetailUser = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8001/user/detail/login${query}`);
    return response.data;
  } catch (error) {
    throw error; // Propagate the error so it can be caught and handled where the function is called.
  }
};

export { addNewUser, getDetailUser, getAllUser };
