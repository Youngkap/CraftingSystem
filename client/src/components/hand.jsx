import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';



const Hand = (props) => {





  return (
    <HandDiv>
      {props.deck.map((tech, i) => {
        return (
        <TechDiv onClick={tech.effect} index={i}>
          {tech.name}
        </TechDiv>
        )})
      }
    </HandDiv>
  )

}

const TechDiv = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: column;
`

const HandDiv = styled.div`
  display: flex;
  width: 1500px;
  height: 300px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: row;
`

export default Hand;