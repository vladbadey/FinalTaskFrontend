import axios from 'axios';

const API_URL = 'https://fanficsappitr.herokuapp.com/api/user/compositions/';

class UserCompositionService {
    getUserCompositions(name) {
        return axios.get(API_URL + "all", {
            params: {name: name}
        });
    }

    getCompositionUser(name) {
        return axios.get(API_URL + 'getUser',{
            params: {name: name}
        })
    }

    createComposition(name, data) {
        return axios.post(API_URL + 'create', data, {
            params: {name: name}
        })
    }

    deleteComposition(name, composition_name) {
        return axios.delete(API_URL + 'delete', {
            params: {
                name: name,
                composition_name: composition_name
            }
        })
    }
}

export default new UserCompositionService();