import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data
    const id = props.location.state.data[0]
    
   const requist =(values)=> {
     console.log(values)
    return Axios.put('/countries'+id, values)}
    return(
      <div>
        <Form data={data} id={id} requist={requist}/>
      </div>
    );
}
export default Update