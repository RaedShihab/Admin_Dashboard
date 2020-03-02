import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = (props)=> {
  const data = props.location.state.data;
  const id = data.id
  console.log(id)
   const requist =(values)=> {
     console.log(values)
    return Axios.post('/categories/'+id, values)}

    const getParentCategories =()=> {
     return Axios.get('/categories')}

    const getCategory =(id)=> {
     return Axios.get('/categories/'+id)}

    const updateIconRequist =(values, media)=> {
      console.log(values)
     return Axios.post('/categories/'+id+`${media}`, values)}

     const updateMedia =(values, type)=> {
      console.log(values)
     return Axios.post('/categories/'+id+'/media/update/'+`${type}`, values)}

    return(
      <div>
        <Form
        data={data}
        response={"the_category_has_updated_successfuly"} 
        patch={true}
        requist={requist}
        updateIconRequist={updateIconRequist}
        updateMedia={updateMedia}
        getCategory={getCategory}
        getParentCategories={getParentCategories}
        />
      </div>
    );
}
export default Update