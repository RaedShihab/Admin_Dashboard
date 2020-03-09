import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const request =(values)=> {
     console.log(values)
    return Axios.post('/locations/countries', values)
  }
    return(
      <div>
        <Form 
        response={"the_country_has_added_successfuly"} 
        request={request}
        patch={false}
        update={false}
        />
      </div>
    );
}
export default Add