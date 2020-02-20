import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Add = ()=> {
  console.log('lllllkkk')
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/countries', values)
  }
    return(
      <div>
        <Form 
        response={"the_country_has_added_successfuly"} 
        requist={requist}
        patch={false}
        />
      </div>
    );
}
export default Add