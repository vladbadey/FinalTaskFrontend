import React, { Component } from "react";
import CompositionService from "../services/composition.service";
import {CardList} from "./card-list.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    const content = CompositionService.getAllCompositions().then(res => {
      this.setState({content: res.data})
    })
    console.log(content)
  }

  render() {
    return (
      <div className="container">
        <CardList content={this.state.content} />
      </div>
    );
  }
}