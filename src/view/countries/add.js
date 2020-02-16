import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/countries', values)
  }
    return(
      <div>
        <Form requist={requist}/>
      </div>
    );
}
export default Add