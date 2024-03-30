import axios from 'axios';

const baseUrl = 'https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;
