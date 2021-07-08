import axios from 'axios';

const API_URL = 'https://fanficsappitr.herokuapp.com/api/fandoms/';

class OnboardingService {
    getAllFandoms() {
        return axios.get(API_URL + 'all');
    }

    fillUserFandomsByEmail(email, data) {
        return axios.post(API_URL + 'fill', data, {
            params: {email: email}
        })
    }

    getAllUserFandoms(name) {
        return axios.get(API_URL + 'user/all', {
            params: {name: name}
        });
    }
}

export default new OnboardingService();
