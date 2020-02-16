import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/districts', values)
  }
    return(
      <div>
        <Form requist={requist}/>
      </div>
    );
}
export default Add