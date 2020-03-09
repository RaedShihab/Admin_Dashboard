import React from 'react';
import Form from './formm';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
   const request =(values)=> {
     console.log(data.id)
    return Axios.post('/locations/cities/'+data.id, values)}
    return(
      <div>
        <Form 
        response={"the_city_has_updated_successfuly"}  
        data={data} 
        request={request}
        update={true}
        />
      </div>
    );
}
export default Update