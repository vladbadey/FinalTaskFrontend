import React, {Component} from "react";
import FavoritesService from "../services/favorites.service";
import AuthService from "../services/auth.service";
import './styles/profile.styles.css'
import {CardList} from "./card-list.component";

export default class UserFavorites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFavorites: []
        };
    }

    componentDidMount() {
        const userFavorites = FavoritesService.getAllFavoritesByName(AuthService.getCurrentUsername()).then(res => {
            this.setState({userFavorites: res.data})
        })
    }

    render() {
        return (
            <div className="container">
                <CardList content={this.state.userFavorites} />
            </div>
        );
    }
}