import axios from "axios";
import {Redirect} from "react-router-dom";

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
                    localStorage.setItem('userEmail', JSON.stringify(response.data.email))
                    localStorage.setItem('username', JSON.stringify(response.data.username))
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
                    localStorage.setItem('usernameSign', username)
                    localStorage.setItem('passwordSign', password)
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentUserEmail() {
        return JSON.parse(localStorage.getItem('userEmail'));
    }

    getCurrentUsernameSignup() {
        return localStorage.getItem('usernameSign')
    }

    getCurrentPasswordSignup() {
        return localStorage.getItem('passwordSign')
    }

    getCurrentUsername() {
        return JSON.parse(localStorage.getItem('username'))
    }

    getCurrentUserPassword() {
        return JSON.parse(localStorage.getItem('password'))
    }
}

export default new AuthService();