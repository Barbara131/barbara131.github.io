import React from 'react'
// import Cal from './components/ca'
import Ball from './components/ball'
// import ReactDOM from 'react-dom'
// import React, { Component } from 'react'

class App extends React.Component {

  state = {
    latitude: null,
    errorMessage: '',

  }

  // componentDidMount() {
  //   console.log("componentdidmount")
  //   window.navigator.geolocation.getCurrentPosition((position) => { this.setState({ latitude: position.coords.latitude }) }, (error) => {
  //     this.setState({ errorMessage: error.message })
  //   })

  // }

  render() {
    // console.log("render")
    return (
      // <Cal />
      <Ball />
      // if (!this.state.errorMessage && this.state.latitude) {
      //   return <div>{this.state.latitude}</div>
      // }
      // if (this.state.errorMessage && !this.state.latitude) {
      //   return <div>{this.state.errorMessage}</div>
      // }
      // else {
      //   return <div>Loading...</div>
      // }
    )
  };
}
export default App;
