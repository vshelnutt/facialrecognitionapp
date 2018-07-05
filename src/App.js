import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Navigation from './components/faceRecognition/faceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'ef5f7f8b9d9d41fcb0ff290495d91741'
});

const particlesOptions = {
                particles: {
                 number: {
                  value: 100,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                 }
                }
              }
            
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''

    }
  }

  onInputChange = (event) {
   this.setstate({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setstate({imageURL: this.state.input})
  app.models.predict(clarifai.COLOR_MODEL, this.state.input).then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
}

  render() {
        return (
          <div className='App'>
            <Particles  className='particles'
              params={particlesOptions}
            />

    <Navigation />
     <Logo />
     <Rank />
       <ImageLinkForm 
       onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit}
       />
        <faceRecognition imageURL ={this.stateimageURL}/>
      </div>
    );
  }
}

export default App;
