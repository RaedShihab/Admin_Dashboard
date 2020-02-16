import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const id = props.location.state.data[0]
   const requist =(values)=> {
     console.log(id._id)
    return Axios.patch('/cities/'+id._id, values)}
    return(
      <div>
        <Form id={id} requist={requist}/>
      </div>
    );
}
export default Update