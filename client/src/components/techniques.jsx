import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';


const Techniques = (props) => {






  return (
    <TecDiv>
      {props.techList.map((tech, i) => {
        if (tech != null) {
          return (
            <SlotDiv value={"player"} index={i+1} onClick={(e) => {props.handleSelect("player", i+1)}} >
              <div>{tech.name}</div>
              <div>{tech.currentHP} / {tech.maxHP}</div>
              <div>{tech.description}</div>
            </SlotDiv>
          )
        } else {
          return (
            <SlotDiv index={i+1} />
          )
        }
      })}
    </TecDiv>
  )

}

const SlotDiv = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: column;
`

const TecDiv = styled.div`
display: flex;
width: 300px;
height: 900px;
border-style: solid; 
border-color: black;
float: left;
flex-direction: column;
`

export default Techniques;