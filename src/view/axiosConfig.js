import axios from 'axios';

const token = ()=> {
    return localStorage.getItem('user')
  }

  let parsedToken
  if(JSON.parse(token()) !== null) {
    parsedToken = JSON.parse(token()).token
  }
  
export const Axios = axios.create({
    baseURL: 'https://api.glowyhan.com/gateway',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
      'Authorization': 'Bearer ' + parsedToken
  }
  });
  