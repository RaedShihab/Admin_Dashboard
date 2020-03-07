import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {

  const submitForm =(values)=> {
    console.log(values)
   return Axios.post('/categories/brands', values)}

    return(
      <div> 
        <Form
        submitForm={submitForm}
        response={"the_brand_has_added_successfuly"}
        patch={false}
        />
      </div>
    );
}
export default Add