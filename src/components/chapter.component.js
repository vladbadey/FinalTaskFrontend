import React, {Component} from "react";
import ChapterService from "../services/chapter.service";
import './styles/chapter.styles.css'
import {Button} from "react-bootstrap";

export default class Chapter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            chapterName: "",
            chapterContent: ""
        };
    }

    componentDidMount() {
        const getChapters = ChapterService.getAllChaptersByCompositionName(localStorage.getItem("composition")).then(res => {
            this.setState({content: res.data})
            this.setState({chapterName: res.data[0].name})
            this.setState({chapterContent: res.data[0].content})
            console.log(res.data)
        })
    }


    render() {
        return (
            <div className="container jumbotron">
                <div className="list-inline">
                    <Button onClick={() => {
                        window.location.assign('https://fanficsappreact.herokuapp.com/createChapter')
                    }}>Добавить главу</Button>
                    <Button onClick={() => {
                        ChapterService.deleteChapter(this.state.chapterName).then(r => {
                            window.location.assign('https://fanficsappreact.herokuapp.com/chapter')
                        });
                    }}>Удалить главу</Button>
                </div>
                <div>
                    {this.state.content.map((chapter, index) => (
                        <div className="inline-list">
                            <ul key={index}>
                                <li><a onClick={() => {
                                    for (let i = 0; i < this.state.content.length; i++) {
                                        this.setState({chapterName: this.state.content[index].name})
                                        this.setState({chapterContent: this.state.content[index].content})
                                    }
                                }}>{index + 1}</a></li>
                            </ul>
                        </div>
                    ))}
                </div>
                <br/>
                <br/>
                <div className="container">
                    <h3>{this.state.chapterName}</h3>
                    <p>{this.state.chapterContent}</p>
                </div>
            </div>
        );
    }
};