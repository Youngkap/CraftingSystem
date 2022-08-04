import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';


const Materials = (props) => {






  return (
    <MatDiv>
      {props.matList.map((mat, i) => {
        if (mat != undefined) {
          return (
            <SlotDiv value={"enemy"} index={i+1} onClick={(e) => {props.handleSelect("enemy", i+1)}} >
              {mat.currentHP} / {mat.maxHP}
            </SlotDiv>
          )
        } else {
          return (
            <SlotDiv />
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