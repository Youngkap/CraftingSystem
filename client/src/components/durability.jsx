import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';


const Durability = (props) => {






  return (
    <DurDiv>
      <GapDiv />
      <GapDiv>{props.hp.currentHP} / {props.hp.maxHP}</GapDiv>
      <GapDiv />
    </DurDiv>
  )

}

const GapDiv = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: column;
`

const DurDiv = styled.div`
display: flex;
width: 300px;
height: 900px;
border-style: solid; 
border-color: black;
float: left;
flex-direction: column;
`

export default Durability;