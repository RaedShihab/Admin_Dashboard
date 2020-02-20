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
        <Form 
        response={"the_district_has_added_successfuly"} 
        requist={requist}
        patch={false}
        />
      </div>
    );
}
export default Add