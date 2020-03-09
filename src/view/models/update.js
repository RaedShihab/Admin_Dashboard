import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
   const request =(values)=> {
    return Axios.post('/categories/models/'+data.id, values)
  }
    return(
      <div>
        <Form 
        response={"the_model_has_updated_successfuly"}
        data={data}
        id={data._id}
        request={request}
        patch={true}
        update={true}
        />
      </div>
    );
}
export default Update