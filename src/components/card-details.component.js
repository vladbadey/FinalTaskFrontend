import React, {Component} from "react";
import CompositionService from "../services/composition.service";
import FandomService from "../services/favorites.service";
import {Button} from "react-bootstrap";
import AuthService from "../services/auth.service";

export default class CardDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };
    }

    componentDidMount() {
        CompositionService.getCompositionByUsername(localStorage.getItem('composition')).then(res => {
            this.setState({content: res.data})
        })
    }


    render() {

        return (
            <div className="container jumbotron">
                <h2>{this.state.content.name}</h2>
                <img src={this.state.content.image} width={350} height={350} align="center"/>
                <br/>
                <br/>
                <h4>Описание:</h4>
                <h5>{this.state.content.description}</h5>
                <br/>
                <Button type="submit" onClick={() => {
                    window.location.assign('http://localhost:8081/chapter')
                }}>Читать</Button>
                <Button onClick={() => {
                    FandomService.addNewFavoriteByName(AuthService.getCurrentUsername(), localStorage.getItem('composition')).then(res => {
                        window.location.assign('http://localhost:8081/home')
                    })
                }}>Добавить в избранное</Button>
            </div>
        );
    }
};