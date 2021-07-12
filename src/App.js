import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'd0a2ab07bf7e439db2b9281fd0f5f603'
});

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      'a403429f2ddf4b49b307e318f00e528b', 
       this.state.input)
      .then(
      function(response){
        console.log('hi', response);
      },
      function(err){

      }
    );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
          
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
        
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  
}

export default App;
