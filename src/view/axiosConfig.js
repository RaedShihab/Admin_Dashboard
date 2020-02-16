import axios from 'axios';

const token = ()=> {
    return localStorage.getItem('user')
  }
  
export const Axios = axios.create({
    baseURL: 'https://api.glowyhan.com/gateway',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type' : 'multipart/form-data',
      'Authorization': 'Bearer ' + JSON.parse(token()).token
  }
  });
  