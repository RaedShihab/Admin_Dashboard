import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data;
  const id = data.id
   const submitForm =(values)=> {
     console.log(values)
    return Axios.post('/categories/brands/'+id, values)}

    const updateIcon =(values, id)=> {
      console.log(values, id)
     return Axios.post(`/categories/brands/${id}/icon`, values)}

     const updateMedia =(values, type)=> {
      console.log(values)
     return Axios.post('/categories/'+id+'/media/update/'+`${type}`, values)}

    return(
      <div>
        <Form
        data={data}
        response={"the_brand_has_updated_successfuly"} 
        patch={true}
        submitForm={submitForm}
        updateIcon={updateIcon}
        updateMedia={updateMedia}
        update={true}
        />
      </div>
    );
}
export default Update