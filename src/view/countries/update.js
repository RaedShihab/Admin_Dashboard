import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
    const id = data._id
    console.log(data)
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/countries/'+id, values)}
    return(
      <div>
        <Form 
        response={"the_country_has_updated_successfuly"} 
        data={data} id={id} 
        requist={requist}
        patch={true}
        />
      </div>
    );
}
export default Update