import React, {Component} from "react";
import CompositionService from "../services/composition.service";
import FandomService from "../services/favorites.service";
import {Button} from "react-bootstrap";
import AuthService from "../services/auth.service";
import UserCompositionService from "../services/user-composition.service";

export default class CardDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            currentUser: undefined,
            compositionUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user
            });
        }
        CompositionService.getCompositionByUsername(localStorage.getItem('composition')).then(res => {
            this.setState({content: res.data})
        })
        UserCompositionService.getCompositionUser(localStorage.getItem('composition')).then(res => {
            this.setState({compositionUser: res.data})
        })
    }

    render() {
        const user = this.state.currentUser;
        const compUser = this.state.compositionUser;

        return (
            <div className="container jumbotron">
                <h2>{this.state.content.name}</h2>
                <img src={this.state.content.image} width={350} height={350} align="center"/>
                <br/>
                <br/>
                <h4>Описание:</h4>
                <h5>{this.state.content.description}</h5>
                <br/>
                <div className="list-inline">
                    <Button type="submit" onClick={() => {
                        // window.location.assign('https://fanficsappreact.herokuapp.com/chapter')
                        console.log(user.name)
                        console.log(compUser)
                    }}>Читать</Button>

                    {user ? (
                        <div className="list-inline">
                            <Button onClick={() => {
                                FandomService.addNewFavoriteByName(AuthService.getCurrentUsername(), localStorage.getItem('composition')).then(res => {
                                    window.location.assign('https://fanficsappreact.herokuapp.com/home')
                                })
                            }}>Добавить в избранное</Button>

                            {user.name === compUser ? (
                                <Button onClick={() => {
                                    UserCompositionService.deleteComposition(AuthService.getCurrentUsername(), localStorage.getItem('composition')).then(res => {
                                        window.location.assign('https://fanficsappreact.herokuapp.com/home')
                                    })
                                }}>Удалить произведение</Button>
                            ) : (
                                <b/>
                            )
                            }
                        </div>
                    ) : (
                        <b/>
                    )}
                </div>
            </div>
        );
    }
};