import React from "react";
import { Card } from './card.component'
import './styles/card-list.styles.css'

export const CardList = props => (
  <div className='card-list'>
      {props.content.map(composition => (
          <Card composition={composition}/>
      ))}
  </div>
);