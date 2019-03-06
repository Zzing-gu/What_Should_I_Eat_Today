
import React, { Component } from 'react';
import './App.css';

import NewMaps from './components/newmap';
import FavResCards from './components/favResCards';
import Navbar from './components/navbar'

class App extends Component {
                                                  
  render() {
    return (
      <div>
        <Navbar/>
        <NewMaps/>
        <FavResCards/>
      </div>
      
    );
  }
}

export default App;