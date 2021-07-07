import axios from 'axios';

const API_URL = 'http://localhost:8080/api/compositions/chapters';

class ChapterService {
    getAllChaptersByCompositionName(name) {
        return axios.get(API_URL + "/all", {
            params: {name: name}
        });
    }

    createChapterByName(name, data) {
        return axios.post(API_URL + '/create', data, {
            params: {name: name}
        })
    }
}

export default new ChapterService();