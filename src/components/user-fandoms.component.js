import React, {Component} from "react";
import OnboardingService from "../services/onboarding.service";
import AuthService from "../services/auth.service";
import './styles/profile.styles.css'
import {Button} from "react-bootstrap";

export default class UserFandoms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFandoms: []
        };
    }

    componentDidMount() {
        const userFandoms = OnboardingService.getAllUserFandoms(AuthService.getCurrentUsername()).then(res => {
            this.setState({userFandoms: res.data})
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Мои предпочтения</h2>
                {this.state.userFandoms.map(fandom => (
                    <div className="container">
                    <img width="450px" height="200px" src={fandom.image}/>
                    <h4>{fandom.name}</h4>
                    </div>
                    ))}
                <br/>
                <br/>
                <Button onClick={() => {
                    window.location.assign('https://fanficsappreact.herokuapp.com//onboarding')
                }
                }>Поменять предпочтения</Button>
            </div>
        );
    }
}