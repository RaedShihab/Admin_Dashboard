import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/districts/'+data._id, values)}
    return(
      <div>
        <Form 
        response={"the_district_has_updated_successfuly"} 
        id={data._id} 
        requist={requist}
        patch={true}
        />
      </div>
    );
}
export default Update