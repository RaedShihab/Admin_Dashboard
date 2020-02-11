import React from 'react';
import Form from './formm';
import axios from 'axios';

class Add extends React.Component {
  render() {
    const token = ()=> {
      return localStorage.getItem('user')
    }
   const requist =(values)=> {
     console.log(values)
    return axios.post('https://jsonplaceholder.typicode.com/users/', values, {
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type' : 'multipart/form-data',
                          'Authorization': 'Bearer ' + token()
                      }
                  })}
    return(
      <div>
        <Form requist={requist}/>
      </div>
    );
  }
}
export default Add