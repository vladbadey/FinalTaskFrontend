import axios from 'axios';

const API_URL = '/api/compositions/';

class CompositionService {
    getAllCompositions() {
        return axios.get(API_URL + 'all');
    }

    getSortedCompositions() {
        return axios.get(API_URL + 'sorted');
    }

    getCompositionByUsername(name) {
        return axios.get(API_URL + 'get',{
            params: {name: name}
        })
    }
}

export default new CompositionService();