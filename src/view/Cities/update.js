import React from 'react';
import Form from './formm';
import axios from 'axios';

class Update extends React.Component {
  render() {
    const token = ()=> {
      return localStorage.getItem('user')
    }
    const id = this.props.location.state.data[0]
   const requist =(values)=> {
     console.log(values)
    return axios.put('https://jsonplaceholder.typicode.com/users/'+id, values, {
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type' : 'multipart/form-data',
                          'Authorization': 'Bearer ' + token()
                      }
                  })}
    return(
      <div>
        <Form id={id} requist={requist}/>
      </div>
    );
  }
}
export default Update