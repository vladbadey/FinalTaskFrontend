import React, {Component, useCallback, useState} from 'react';
import {Button, FormCheck} from "react-bootstrap";
import ChapterService from "../services/chapter.service";
import Textarea from "react-validation/src/components/textarea";


export class AddChapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: "",
            setImage: "",
            url: "",
            setUrl: "",
            fandoms: []
        };
    }



    render() {
        return (
            <div className="input">
                <h1><strong>Создание главы</strong></h1>
                <br/>
                <br/>
                <br/>
                <h4>Введите название главы</h4>
                <input id="chapter_name" type="text" style={{padding: 6}} size="50"/>
                <br/>
                <br/>
                <h4>Введите текст главы</h4>
                <Textarea id="chapter_content" type="text" style={{padding: 100}} size="100"/>
                <Button onClick={() => {
                    let res = {
                        name: document.getElementById("chapter_name").value,
                        content: document.getElementById("chapter_content").value
                    }
                    ChapterService.createChapterByName(localStorage.getItem('composition'), JSON.parse(JSON.stringify(res))).then(res => {
                        window.location.assign('https://fanficsappreact.herokuapp.com/chapter')
                    })
                }
                }>Добавить главу</Button>

            </div>
        );
    }
}

export default AddChapter;