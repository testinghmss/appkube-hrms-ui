import axios from 'axios';

const API = axios.create({
    baseURL : 'https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev',
})

export default API; 