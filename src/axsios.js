import React from 'react';
import axios from 'axios';

class Test extends React.Component {

    // ax = axios({
    //     method: 'get',
    //     url: 'https://api.glowyhan.com/locations/countries',
    //     responseType: 'stream'
    //   })
    //     .then(function(response) {
    //     console.log(response)
    //   });

     options = {
        method: 'GET',
        url: 'https://api.glowyhan.com/locations/countries',
        headers: {},
      };

     onClick = axios(this.options, function(error, response) {
         console.log('hh')
        if (error) throw new Error(error);
        console.log(response.body);
      });

    render() {
        return(
            <div>
                <button
                onClick={this.ax}
                >requist</button>
            </div>
        )
    }
}

export default Test