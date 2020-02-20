import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const id = props.location.state.data[0]
   const requist =(values)=> {
     console.log(id._id)
    return Axios.post('/cities/'+id._id, values)}
    return(
      <div>
        <Form 
        response={"the_city_has_updated_successfuly"}  
        id={id} 
        requist={requist}
        patch={true}
        />
      </div>
    );
}
export default Update