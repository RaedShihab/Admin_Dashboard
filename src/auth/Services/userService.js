// // import config from 'config';
// import { authHeader } from '../Helpers/authHeader';
// // import {apiUrl} from '../../api';

// export const userService = {
//     login,
//     logout,
//     getAll
// };

// function login(username, password) {
//     const body = JSON.stringify({ login:username, password:password })
//     const data = { login:username, password:password }

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: body
//     };

//     // return fetch(`${apiUrl}/api/login/email`, requestOptions)
//     return fetch(`https://api.glowyhan.com/auth/login`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // login successful if there's a jwt token in the response
//             if (user.token) {
//                 console.log('user',user)
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 // localStorage.setItem('user', JSON.stringify(user));
//                return fetch(`https://api.glowyhan.com/auth/me`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Authorization': 'Bearer ' + user.token
//                     // 'Content-Type': 'application/json'
//                 },}).then(res => {
//                     console.log(res)
//                     localStorage.setItem('user', JSON.stringify(user));
//                 })
//                     .catch(err=> console.log(err))
//             }

//             return user;
//         });
// }

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`/users`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 // location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
// import config from 'config';
import { authHeader } from '../Helpers/authHeader';

export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}