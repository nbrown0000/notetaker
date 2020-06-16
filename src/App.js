import React from 'react';
import './App.css';
import HomeScreen from "./HomeScreen";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'user1'
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.username === '' ?
          <Login />
        :
          <HomeScreen />
        }
      </div>
    );
  }
}

export default App;
