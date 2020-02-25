import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  console.log(props.location.state.data[0])
    const data = props.location.state.data[0]
    console.log(data._id)
   const requist =(values)=> {
    return Axios.post('/models/'+data._id, values)}
    return(
      <div>
        <Form 
        response={"the_model_has_updated_successfuly"}  
        data={data}
        id={data._id}
        requist={requist}
        patch={true}
        />
      </div>
    );
}
export default Update