import axios from 'axios';

const baseUrl = 'https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;
