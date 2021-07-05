import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/compositions/';

class UserCompositionService {
    getUserCompositions(name) {
        return axios.get(API_URL + "all", {
            params: {name: name}
        });
    }
}

export default new UserCompositionService();