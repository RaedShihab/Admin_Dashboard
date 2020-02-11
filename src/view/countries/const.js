const body = JSON.stringify({ login:username, password:password })
    const data = { login:username, password:password }
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Accept': 'application/json' },
    //     body: JSON.stringify(body)
    // };
    const api = `https://api.glowyhan.com/gateway/auth/login`

    axios.post(api, data, {
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(function (response) {
        console.log(response);
        bake_cookie('token', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });