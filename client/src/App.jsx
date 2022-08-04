import styled from 'styled-components';
import React from 'react';

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
      technique1: null, 
      technique2: null, 
      technique3: null,
      completion: {
        currentHP: 10, 
        maxHP:10
      }, 
      material1: {
        name: "Iron",
        currentHP: 5,
        maxHP: 5,
        effect: () => {
          let ranDamage = Math.floor(Math.random() * 3) + 1;
          this.handleRandomTarget("player", (chosenTarget) => {
            this.handleDamage(chosenTarget, ranDamage);
          })
        },
        description: "Deals 1-3 damage to either the durability or a random technique.",
        priority: false
      },
      material2: null,
      material3: null,
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
          effect: () => {
            this.createResidual("Cooling", 5, () => {}, "This technique must be targeted.", true)
          },
          description: "Create a residual technique that will be targeted before the base material. This has 5 HP."
        },
        {
          name: "Shape",
          effect: () => {
            this.createResidual("Shaping", 2, () => {
              this.handleRandomTarget("enemy", (chosenTarget) => {
                this.handleDamage(chosenTarget, 3);
              })
            }, "Deal 3 damage to a random material at the start of your turn.")
          },
          description: "Create a residual technique that will deal 3 damage to a random material at the start of your turn. This has 2 HP."
        },
        {
          name: "End Turn",
          effect: () => {
            this.handleEndTurn();
          },
          description: "End your turn."
        }
      ],
      targeting: false,
      activatingEffect: null,
      priority_player: [],
      priority_enemy: []
    }
 
    this.handleDamage = this.handleDamage.bind(this);
    this.handleRandomTarget = this.handleRandomTarget.bind(this);
    this.handleSelectingEffect = this.handleSelectingEffect.bind(this);
    this.handleSelectingTarget = this.handleSelectingTarget.bind(this);
    this.createResidual = this.createResidual.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  componentDidMount() {


  }


  handleDamage(target, amount) {
    if (this.state[target] != null) {
      let newHP = this.state[target];
      newHP.currentHP-= amount;
      if (newHP.currentHP <= 0) {
        this.setState({[target]: null});
      } else {
        this.setState({[target]: newHP});
      }
    }
  }

  handleRandomTarget(targetSide, effect) {
    let targetArray = [];
    if (targetSide == "enemy") {
      targetArray.push("completion");
      for (let i = 1; i < 4; i++) {
        if (this.state[`material${i}`] != null) {
          targetArray.push(`material${i}`);
        }
      }
      
    } else if (targetSide == "player") {
      console.log("player being targeted")
      targetArray.push("durability");
      for (let i = 1; i < 4; i++) {
        if (this.state[`technique${i}`] != null) {
          if (this.state[`technique${i}`].priority == true) {
            targetArray = [`technique${i}`];
            break;
          }
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
  
  createResidual (name, health, effect, description, priority) {
    let isPriority = priority || false;
    for (let r = 1; r < 4; r++) {
      if (this.state[`technique${r}`] == null) {
        this.setState({[`technique${r}`]: {
          name: name,
          currentHP: health,
          maxHP: health,
          effect: effect,
          description: description,
          priority: isPriority
        }})
        break;
      }
    }
  }

  handleEndTurn () {
    //Passive Effects of Residual Techniques
    for (let p = 1; p < 4; p++) {
      if (this.state[`technique${p}`] != null) {
        this.state[`technique${p}`].effect();
      }
    }
    
    //Enemy Turn
    for (let m = 1; m < 4; m++) {
      if (this.state[`material${m}`] != null) {
        this.state[`material${m}`].effect();
      }
    }

  }

  render () {
    return (<OverDiv>
      <FieldDiv>
        <Durability hp={this.state.durability} handleSelect={this.handleSelectingTarget} />
        <Techniques techList={[this.state.technique1, this.state.technique2, this.state.technique3]} handleSelect={this.handleSelectingTarget} />
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


