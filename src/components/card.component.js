import React from "react";
import './styles/card.styles.css'
import ChapterService from "../services/chapter.service";

let content = ChapterService.getAllChaptersByCompositionName(localStorage.getItem("composition")).then(res => {
    content = res.data;
})
export const Card = (props) => (
    <div className='card-container' onClick={() => {
        localStorage.setItem('composition', props.composition.name)
        window.location.assign('http://localhost:8081/cardDetails')
    }}>

        <img className='card-img' height={220} width={150} alt="image" src={props.composition.image}/>
        <h4 className='card-title'>{props.composition.name}</h4>
    </div>
)