import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
   const request =(values)=> {
     console.log(values)
    return Axios.post('/locations/districts/'+data.id, values)}
    return(
      <div>
        <Form 
        data={data}
        response={"the_district_has_updated_successfuly"} 
        id={data._id} 
        request={request}
        update={true}
        />
      </div>
    );
}
export default Update