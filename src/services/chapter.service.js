import axios from 'axios';

const API_URL = 'https://fanficsappitr.herokuapp.com/api/compositions/chapters';

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

    deleteChapter(chapter_name) {
        return axios.delete(API_URL + "/delete", {
            params: {chapter_name: chapter_name}
        });
    }
}

export default new ChapterService();