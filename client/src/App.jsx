import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import Completion from './components/completion.jsx';
import Durability from './components/durability.jsx';
import Materials from './components/materials.jsx';
import Techniques from './components/techniques.jsx';
import Hand from './components/hand.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durability: {
        currentHP: 10, 
        maxHP:10
      }, 
      technique1: undefined, 
      technique2: undefined, 
      technique3: undefined,
      completion: {
        currentHP: 10, 
        maxHP:10
      }, 
      material1: {
        currentHP: 10,
        maxHP: 10
      },
      material2: undefined,
      material3: undefined,
      tech_deck: [
        {
          name: "Temper",
          effect: () => {
            console.log("Here")
            for (let n = 0; n < 3; n++) {
              this.handleRandomTarget("enemy", (chosenTarget) => {
                this.handleDamage(chosenTarget, 2);
              })
            }
          },
          description: "Deal 2 damage to 3 random materials."
        },
        {
          name: "Strike",
          effect: () => {
            console.log("here");
            this.handleSelectingEffect((chosenTarget) => {
              let ranDamage = Math.floor(Math.random() * 4) + 1;
              this.handleDamage(chosenTarget, ranDamage);
            })
          },
          description: "Deal 1-5 damage to a target material."
        },
        {
          name: "Cool",
          effect: () => {},
          description: "Create a residual technique that will be targeted before the base material. This has 5 HP."
        },
        {
          name: "Shape",
          effect: () => {},
          description: "Create a residual technique that will deal 3 damage to a random material at the start of your turn. This has 2 HP."
        },
        {
          name: "Heat",
          effect: () => {},
          description: "Double the next instance of damage you deal."
        }
      ],
      targeting: false,
      activatingEffect: null
    }
 
    this.handleDamage = this.handleDamage.bind(this);
    this.handleRandomTarget = this.handleRandomTarget.bind(this);
    this.handleSelectingEffect = this.handleSelectingEffect.bind(this);
    this.handleSelectingTarget = this.handleSelectingTarget.bind(this);
  }

  componentDidMount() {


  }


  handleDamage(target, amount) {
    if (this.state[target] != undefined) {
      let newHP = this.state[target];
      newHP.currentHP-= amount;
      this.setState({[target]: newHP});
    }
    console.log(target)
    console.log(this.state[target])
  }

  handleRandomTarget(targetSide, effect) {
    let targetArray = [];
    if (targetSide = "enemy") {
      targetArray.push("completion");
      for (let i = 1; i < 4; i++) {
        if (this.state[`material${i}`] != undefined) {
          targetArray.push(`material${i}`);
        }
      }
      
    } else if (targetSide = "player") {
      targetArray.push("durability");
      for (let i = 1; i < 4; i++) {
        if (this.state[`technique${i}`] != undefined) {
          targetArray.push(`technique${i}`);
        }
      }
      
    }
    console.log(targetArray);
    let randomChoice = Math.floor(Math.random() * targetArray.length);

    effect(targetArray[randomChoice])
  }

  handleSelectingEffect (effect) {
    if (this.state.targeting == false) {
      this.setState({targeting: true, activatingEffect: effect});
      console.log("Effect selected");
    } else {
      this.setState({targeting: false, activatingEffect: null});
    }
    
  }

  handleSelectingTarget (side, ind) {
    console.log(side, ind);

    if (this.state.targeting) {
      if (ind == 0) {
        if (side == "player") {
          this.state.activatingEffect("durability");
        } else if (side == "enemy") {
          this.state.activatingEffect("completion")
        }
      } else {
        if (side == "player") {
          this.state.activatingEffect(`technique${ind}`);
        } else if (side == "enemy") {
          this.state.activatingEffect(`material${ind}`);
        }
      }
      
    }
    this.setState({targeting: false, activatingEffect: null})
  }  
  

  render () {
    return (<OverDiv>
      <FieldDiv>
        <Durability hp={this.state.durability} handleSelect={this.handleSelectingTarget} />
        <Techniques techlist={[this.state.technique1, this.state.technique2, this.state.technique3]} handleSelect={this.handleSelectingTarget} />
        <GapDiv/>
        <Materials matList={[this.state.material1, this.state.material2, this.state.material3]} handleSelect={this.handleSelectingTarget} />
        <Completion hp={this.state.completion} handleSelect={this.handleSelectingTarget} />
      </FieldDiv>
      <Hand deck={this.state.tech_deck} />
    </OverDiv>)
  }
}


const GapDiv = styled.div`
  display: flex;
  width: 300px;
  height: 900px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: column;
`

const FieldDiv = styled.div`
  display: flex;
  width: 1500px;
  height: 900px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: row;
`

const OverDiv = styled.div`
  display: flex;
  width: 1500px;
  height: 1200px;
  border-style: solid; 
  border-color: black;
  float: left;
  flex-direction: column;
`

export default App;


