import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const request =(values)=> {
     console.log(values)
    return Axios.post('/locations/districts', values)
  }
    return(
      <div>
        <Form 
        response={"the_district_has_added_successfuly"} 
        request={request}
        update={false}
        />
      </div>
    );
}
export default Add