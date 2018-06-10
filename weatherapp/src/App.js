import React, { Component } from "react";
import Weather from "./Components/Weather";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <Weather city="london" country="GB" title="Weather App" />
        </div>
      </div>
    );
  }
}

export default App;
