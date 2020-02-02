import axios from 'axios';
import {countries} from './service';

const USER_API_BASE_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
// const USER_API_BASE_URL_GITHUB = "https://api.github.com/users";
// const USER_API_BASE_URL_SERVER = "http://165.227.194.252/auth/api/login/facebook/login-url";


class ApiService {
    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }
    fetchPosts() {
        return axios.get(POSTS_API_BASE_URL);
    }
    fetchCountries() {
        return Promise.resolve(countries);
    }
}

export default new ApiService();