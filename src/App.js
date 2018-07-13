import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      // imageURL: ''

    }
  }

  onInputChange = (event) => {console.log(event.target.value)
   // this.setstate({input: event.target.value});
  }
// Clarifai.COLOR_MODEL, this.state.input
onButtonSubmit = () => {console.log("click");
  // this.setstate({imageURL: this.state.input})
 app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      
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
      
      </div>
    );
  }
}

export default App;
