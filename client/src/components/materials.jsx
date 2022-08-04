import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';


const Materials = (props) => {






  return (
    <MatDiv>
      {props.matList.map((mat, i) => {
        if (mat != null) {
          return (
            <SlotDiv value={"enemy"} index={i+1} onClick={(e) => {props.handleSelect("enemy", i+1)}} >
              <div>{mat.name}</div>
              <div>{mat.currentHP} / {mat.maxHP}</div>
              <div>{mat.description}</div>
            </SlotDiv>
          )
        } else {
          return (
            <SlotDiv index={i+1} />
          )
        }
      })}
    </MatDiv>
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

const MatDiv = styled.div`
display: flex;
width: 300px;
height: 900px;
border-style: solid; 
border-color: black;
float: left;
flex-direction: column;
`

export default Materials;