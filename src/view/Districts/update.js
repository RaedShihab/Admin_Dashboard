import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
   const requist =(values)=> {
     console.log(values)
    return Axios.patch('/districts/'+data._id, values)}
    return(
      <div>
        <Form id={data._id} requist={requist}/>
      </div>
    );
}
export default Update