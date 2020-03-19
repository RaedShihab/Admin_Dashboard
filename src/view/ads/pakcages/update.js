import React from 'react';
import Form from './form';
import {Axios} from '../../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data;
  const id = data.id
   const submitForm =(values)=> {
     console.log(values)
    return Axios.post('/categories/brands/'+id, values)}

    const updateIcon =(values, id)=> {
      console.log(values, id)
     return Axios.post(`/categories/brands/${id}/icon`, values)}

     const getCategory =(id)=> {
      return Axios.get('/categories/brands/'+id)}

    return(
      <div>
        <Form
        data={data}
        response={"the_brand_has_updated_successfuly"} 
        patch={true}
        submitForm={submitForm}
        updateIcon={updateIcon}
        getCategory={getCategory}
        update={true}
        />
      </div>
    );
}
export default Update