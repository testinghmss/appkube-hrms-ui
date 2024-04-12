import axios from 'axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';

const API = axios.create({
    baseURL : 'https://68v4n18rx1.execute-api.us-east-1.amazonaws.com/dev',
})


export default API; 