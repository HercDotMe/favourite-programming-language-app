import axios from 'axios';
const API_URL = 'http://localhost:8081/api';

const apiService = {
    getFavouriteProgrammingLanguage: function(provider, username) {
        const url = `${API_URL}/favourite-programming-language/${provider}/${username}`;
        return axios.get(url).then(response => response.data);
    }
}

export default apiService;