import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import axios from 'axios';
import React from 'react';

import axiosClient from '../src/apiClient.js';
import { data } from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
 
  }

  componentDidMount() {
    
    
    
  }


  

  render () {
    return (<OverDiv>
      
    </OverDiv>)
  }
}



const TopDiv = styled.div`
  display: flex;
  width: 1500px;
  height: 1500px;
  float: left;
  flex-direction: row;
`

const OverDiv = styled.div`
  display: flex;
  width: 1500px;
  height: 3000px;
  float: left;
  flex-direction: column;
`

export default App;


