import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const request =(values)=> {
     console.log(values)
    return Axios.post('/categories', values)
  }
    return(
      <div> 
        <Form
        response={"the_category_has_added_successfuly"}
        patch={false}
        request={request}/>
      </div>
    );
}
export default Add