import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/cities', values)
  }
    return(
      <div>
        <Form requist={requist}/>
      </div>
    );
}
export default Add