import _ from 'underscore';
import styled from 'styled-components';
import React from 'react';


const Completion = (props) => {






  return (
    <ComDiv>
      <GapDiv />
      <GapDiv value={"enemy"} index={0} onClick={(e) => {props.handleSelect("enemy", 0)}} >
        {props.hp.currentHP} / {props.hp.maxHP}
        </GapDiv>
      <GapDiv />
    </ComDiv>
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

const ComDiv = styled.div`
display: flex;
width: 300px;
height: 900px;
border-style: solid; 
border-color: black;
float: left;
flex-direction: column;
`

export default Completion;