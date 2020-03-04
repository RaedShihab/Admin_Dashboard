import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/categories', values)
  }
    return(
      <div> 
        <Form
        response={"the_category_has_added_successfuly"}
        patch={false}
        requist={requist}/>
      </div>
    );
}
export default Add