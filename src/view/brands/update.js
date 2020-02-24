import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data;
    const id = data._id
   const requist =(values)=> {
    return Axios.post('/brands/'+id, values)}
    return(
      <div>
        <Form id={id} data={data}  requist={requist}/>
      </div>
    );
}
export default Update