import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
    const data = props.location.state.data[0]
    const id = data.id

    const updateFlag = (values) => {
      return Axios.post(`/locations/countries/${id}/flag`, values)
    }

   const request =(values)=> {
     console.log(values)
    return Axios.post('/locations/countries/'+id, values)}
    return(
      <div>
        <Form 
        response={"the_country_has_updated_successfuly"} 
        data={data} id={id} 
        request={request}
        updateFlag={updateFlag}
        patch={true}
        update={true}
        />
      </div>
    );
}
export default Update