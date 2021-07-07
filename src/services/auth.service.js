import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('userEmail', JSON.parse(JSON.stringify(response.data.email)))
                    localStorage.setItem('username', JSON.parse(JSON.stringify(response.data.username)))
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem('userEmail')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }

    register(username, email, password) {
        return axios
            .post(API_URL + "signup", {
                username,
                email,
                password
            })
            .then(response => {
                localStorage.setItem('userEmail', email)
                localStorage.setItem('username', username)
                localStorage.setItem('passwordSign', password)
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentUserEmail() {
        return localStorage.getItem('userEmail');
    }

    getCurrentEmailSignup() {
        return localStorage.getItem('emailSign')
    }

    getCurrentUsernameSignup() {
        return localStorage.getItem('usernameSign')
    }

    getCurrentPasswordSignup() {
        return localStorage.getItem('passwordSign')
    }

    getCurrentUsername() {
        return localStorage.getItem('username')
    }

    getCurrentUserPassword() {
        return localStorage.getItem('password')
    }
}

export default new AuthService();