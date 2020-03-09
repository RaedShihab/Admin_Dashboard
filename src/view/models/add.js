import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const request =(values)=> {
     console.log(values)
    return Axios.post('/categories/models', values)
  }
    return(
      <div>
        <Form 
        response={"the_models_has_added_successfuly"} 
        request={request}
        patch={false}
        update={false}
        />
      </div>
    );
}
export default Add