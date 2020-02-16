import React from 'react';
import Form from './form';
import {Axios} from '../axiosConfig';

const Update = ()=> {
    // const id = this.props.location.state.data[0]
   const requist =(values)=> {
     console.log(values)
    return Axios.put('/users/', values)}
    return(
      <div>
        <Form  requist={requist}/>
      </div>
    );
}
export default Update