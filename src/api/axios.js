import axios from 'axios';

const API = axios.create({
    baseURL : 'https://wm1z9xila0.execute-api.us-east-1.amazonaws.com/dev',
})

export default API; 