import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Add = ()=> {
   const request =(values)=> {
     console.log(values)
    return Axios.post('/locations/cities', values)
  }
    return(
      <div>
        <Form 
        response={"the_city_has_added_successfuly"} 
        request={request}
        update={false}
        />
      </div>
    );
}
export default Add