import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      imageUrl: ''

    }
  }

  onInputChange = (event) => {console.log(event.target.value)
   this.setState({input: event.target.value});
  }

onButtonSubmit = () => {console.log("click")
  this.setState({imageUrl: this.state.input})
 app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
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
      <FaceRecognition imageUrl={this.state.input}/>
      </div>
    );
  }
}

export default App;
