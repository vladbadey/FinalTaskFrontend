import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserCompositionService from "../services/user-composition.service";
import OnboardingService from "../services/onboarding.service";
import './styles/profile.styles.css'
import {Button, FormCheck} from "react-bootstrap";
import {CardList} from "./card-list.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      currentUser: { username: "" },
      userCompositions: []
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const userCompositions = UserCompositionService.getUserCompositions(AuthService.getCurrentUsername()).then(res => {
      {this.setState({userCompositions: res.data})}
    })

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> профиль
          </h3>
          <br/>
          <div className="container">
          <Button type="submit" onClick={() => {
            window.location.assign('http://localhost:8081/userFandoms')
          }}>Мои предпочтения</Button>
          <Button onClick={() => {
            window.location.assign('http://localhost:8081/userFavorites')
          }}>Мои избранные</Button>
          </div>
        </header>
          <br/>
          <div className="my_compositions_header">
            <h4><strong>Мои произведения</strong></h4>
            <Button onClick={() => {
              window.location.assign('http://localhost:8081/newCard')
            }}>+</Button>
          </div>
          <CardList content={this.state.userCompositions} />
      </div>
      </div>
    );
  }
}