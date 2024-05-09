import axios from 'axios'


const api= axios.create({
    baseURL:'https://exmple.com/api',
    headers:{
        'Content-Type':'application/json'
    },
});
export default api;
