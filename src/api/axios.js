import axios from 'axios';

const API = axios.create({
    baseURL : 'https://bwppdwpoab.execute-api.us-east-1.amazonaws.com/dev',
})

export default API; 