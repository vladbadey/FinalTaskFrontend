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
            fandoms: [],
            compositions: []
        };
    }

    componentDidMount() {
        const content = CompositionService.getAllCompositions().then(res => {
            this.setState({content: res.data})
        })
        console.log(content)
        OnboardingService.getAllFandoms().then(res => {
            this.setState({fandoms: res.data})
        })
    }

    getAllCompositions = () => {
        CompositionService.getAllCompositions().then(res => {
            this.setState({content: res.data})
        })
    }

    updateCompositionsByFandom = (name) => {
        CompositionService.getCompositionsByFandom(name).then(r => {
            this.setState({compositions: r.data})
        })
    }

    getSortedCompositions = () => {
        CompositionService.getSortedCompositions().then(r => {
            this.setState({compositions: r.data})
        })
    }

    render() {
        const compositions = this.state.compositions;
        return (
            <div className="container">
                <div className="list-inline">
                    <Button onClick={() => {
                        this.getSortedCompositions()
                    }}>Сортировать по дате</Button>
                    <select size="1" id="select">
                        <option onChange={() => {
                            this.getAllCompositions()
                        }}>Все</option>
                        {this.state.fandoms.map((fandom, index) => (
                            <option key={index} value={fandom.name} onChange={() => {
                                this.updateCompositionsByFandom(fandom.name)
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