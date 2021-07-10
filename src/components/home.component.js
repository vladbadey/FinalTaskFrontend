import React, {Component} from "react";
import CompositionService from "../services/composition.service";
import {CardList} from "./card-list.component";
import {Button} from "react-bootstrap";
import OnboardingService from "../services/onboarding.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            compositions: []
        };
    }

    componentDidMount() {
        const content = CompositionService.getAllCompositions().then(res => {
            this.setState({content: res.data})
        })
        console.log(content)
        const fandoms = OnboardingService.getAllFandoms().then(res => {
            this.setState({fandoms: res.data})
        })
    }

    render() {
        const compositions = this.state.compositions;
        return (
            <div className="container">
                <div className="list-inline">
                    <Button onClick={() => {
                        CompositionService.getSortedCompositions().then(r => {
                            this.setState({compositions: r.data})
                        });
                    }}>Сортировать по дате</Button>
                    <select size="1" id="select">
                        {this.state.fandoms.map((fandom, index) => (
                            <option key={index} value={fandom.name} onClick={() => {
                                CompositionService.getCompositionsByFandom(fandom.name).then(r => {
                                    this.setState({compositions: r.data})
                                })
                            }}>{fandom.name}</option>
                        ))}
                    </select>
                </div>
                {compositions ? (
                    <CardList content={this.state.compositions}/>
                ) : (
                    <CardList content={this.state.content}/>
                )}

            </div>
        );
    }
}