import React, {Component} from "react";
import OnboardingService from "../services/onboarding.service";
import AuthService from "../services/auth.service"
import {Button, FormCheck} from "react-bootstrap";
import Home from "./home.component";
import {Route} from "react-router-dom";

export default class Onboarding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            length: null,
            content: [],
            checkedState: []

        };
    }

    componentDidMount() {
        const content = OnboardingService.getAllFandoms().then(res => {
            this.setState({content: res.data})
            this.setState(this.state.checkedState = new Array(res.data.length).fill(false))

        })
        console.log(content)
    }


    render() {

        const handleOnChange = (position) => {
            const updatedCheckedState = this.state.checkedState.map((item, index) =>
                index === position ? !item : item
            )
            this.setState(this.state.checkedState = updatedCheckedState)
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h2>Выберите фэндомы</h2>
                </header>
                {this.state.content.map((fandom, index) => (
                    <div className="toppings-list-item">
                        <FormCheck checked={this.state.checkedState[index]} onChange={() => {
                            handleOnChange(index)
                            console.log(this.state.checkedState)
                            console.log(AuthService.getCurrentUserEmail())
                        }}/>
                        <img width="450px" height="200px" src={fandom.image}/>
                        <h4>{fandom.name}</h4>
                    </div>
                ))}
                <br/>
                <Button type="submit" onClick={key => {
                    let list = [];
                    for (let i = 0; i < this.state.content.length; i++) {
                        if (this.state.checkedState[i] === true) {
                            list.push(this.state.content[i]);
                        }
                    }

                    console.log(list)
                    OnboardingService.fillUserFandomsByEmail(AuthService.getCurrentUserEmail(), list).then(res => {
                            console.log("Filled fandoms")
                        }
                    )
                    AuthService.login(AuthService.getCurrentUsername(), AuthService.getCurrentPasswordSignup()).then(() => {
                        window.location.assign('https://fanficsappreact.herokuapp.com/home')
                    })
                }
                }>Submit</Button>
            </div>
        );
    }
};