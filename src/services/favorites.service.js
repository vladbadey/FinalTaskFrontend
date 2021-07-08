import axios from 'axios';

const API_URL = 'https://fanficsappitr.herokuapp.com/api/favorites/';

class FavoritesService {
    addNewFavoriteByName(username, compositionName) {
        return axios.post(API_URL + "add", null, {
            params: {
                username: username,
                compositionName: compositionName
            }
        });
    }

    getAllFavoritesByName(name) {
        return axios.get(API_URL + "all", {
            params: {name: name}
        });
    }
}

export default new FavoritesService();