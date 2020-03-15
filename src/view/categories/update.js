import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data;
  const id = data.id
   const request =(values)=> {
     console.log(values)
    return Axios.post('/categories/'+id, values)}

    const getCategory =(id)=> {
     return Axios.get('/categories/'+id)}

    const updateIconRequist =(values, media)=> {
      console.log(values)
     return Axios.post('/categories/'+id+`${media}`, values)}

     const updateMedia =(values, type)=> {
      console.log(values)
     return Axios.post('/categories/'+id+'/media/update/'+`${type}`, values)
    }

     const updateSpecification =(spacificationId, values)=> {
      console.log(spacificationId,values)
      values.append('_method', 'patch');
     return Axios.post(`/categories/specifications/${spacificationId}`, values)
   }

    const addSpecification =(categoryId, values)=> {
      console.log(categoryId,values)
    return Axios.post(`/categories/${categoryId}/specifications`, values)
  }

    return(
      <div>
        <Form
        data={data}
        response={"the_category_has_updated_successfuly"} 
        patch={true}
        request={request}
        updateIconRequist={updateIconRequist}
        updateMedia={updateMedia}
        getCategory={getCategory}
        addSpecification={addSpecification}
        updateSpecification={updateSpecification}
        update={true}
        />
      </div>
    );
}
export default Update