import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/models', values)
  }
    return(
      <div>
        <Form 
        response={"the_models_has_added_successfuly"} 
        requist={requist}
        patch={false}
        />
      </div>
    );
}
export default Add