import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data;
  const id = data._id
  console.log(id)
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/categories/'+id, values)}
    return(
      <div>
        <Form
        response={"the_category_has_updated_successfuly"} 
        patch={true}
        requist={requist}/>
      </div>
    );
}
export default Update