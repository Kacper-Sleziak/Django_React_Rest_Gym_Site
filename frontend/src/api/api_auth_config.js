import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export default function getAuthAxiosInstance(token) {
return (
    axios.create({
        baseURL: BASE_URL,
            headers: {
            Authorization : `Token ${token}`
        },
        })
    );  
}


