import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";


const particlesOptions = {
  
        fpsLimit: 50,
        interactivity: {
          events: {
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 40,
              duration: 0.5,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 80,
            enable: true,
            opacity: 0.3,
            width: 0.7,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 480,
          },
          opacity: {
            value: 0.1,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
}



class App extends Component {

  constructor() {
    super();
    this.state={
      input: '',
      imageURL: '',
      regions: [],
      route: 'signin',
      isSignedIn: 'false',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        date_registered: ''
      }
    }
  }
  
  onInput = (event) => {
    this.setState({input:event.target.value})
    console.log(this.state.input)
  }

  onButtonClick = () => {
    this.setState({imageURL: this.state.input});
    this.fetchBorders();
      }


  updateUserInfo = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        date_registered: user.date_registered
      }
    })

  }

  updateEntries = (newEntries) => {
    this.setState(Object.assign(this.state.user, {entries: newEntries}))
  }

  fetchBorders = () => {
    
    fetch('https://api-face-marker.herokuapp.com/imageUrl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: this.state.input
      }),
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      this.fetchEntries();
      this.setState({regions: result.outputs[0].data.regions})
    })
    .catch(error => console.log('error', error));
    
  }

  fetchEntries = () => {
  fetch('https://api-face-marker.herokuapp.com/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(entriesData => {
            if (entriesData) {
              this.updateEntries(entriesData)
            }        
           })
  }



  changeRoute = (newRoute) => {
    this.setState({route: newRoute})
  }

render () {
  return (
  <div className="App">
    <Particles className="particles" options={particlesOptions} />
     <div className="row-top">
      <Logo />
      <Navigation changeRoute={this.changeRoute} route={this.state.route} />
    </div>
    { 
    this.state.route==='home' ? <div className="pullup">
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
      <ImageLinkForm onInput={this.onInput} onButtonClick={this.onButtonClick}/>
      <FaceRecognition imageURL={this.state.imageURL} regions={this.state.regions}/>
    </div> : 
      <div> { this.state.route==='signin' ? 
      <SignIn updateUserInfo={this.updateUserInfo} changeRoute={this.changeRoute} /> : 
      <SignUp updateUserInfo={this.updateUserInfo} changeRoute={this.changeRoute} /> } </div>
      }  </div>)
}
}



export default App;





//   fetchBorders = () => {
//     let raw = JSON.stringify({
//         "user_app_id": {
//           "user_id": "giladi84",
//           "app_id": "faceRec"
//         },
//         "inputs": [
//           {
//             "data": {
//               "image": {
//                 "url": this.state.input
//               }
//             }
//           }
//         ]
//       });

//     let requestOptions = {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key 10ebf6683cde40a6a4f666d6f60e0315'
//           },
//           body: raw
//         };

//     fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       this.updateBox(result.outputs[0].data.regions[0].region_info.bounding_box);
//       this.fetchEntries();
//     })
//     .catch(error => console.log('error', error));

// }






  // updateBox = (borders) => {
  //   let top = `${borders.top_row*100}%`;
  //   let bottom = `${(1-borders.bottom_row)*100}%`;
  //   let left = `${borders.left_col*100}%`;
  //   let right = `${(1-borders.right_col)*100}%`;
  //   this.setState({box: [top,bottom,left,right]})
  //   console.log(top,bottom,left,right)
  // }