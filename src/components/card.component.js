import React from "react";
import './styles/card.styles.css'

export const Card = (props) => (
    <div className='card-container' onClick={() => {
        localStorage.setItem('composition', props.composition.name)
        window.location.assign('http://localhost:8081/cardDetails')
    }}>
        <img className='card-img' height={220} width={150} alt="image" src={props.composition.image}/>
        <h4 className='card-title'>{props.composition.name}</h4>
    </div>
)