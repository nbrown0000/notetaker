import React from 'react';
import './App.css';
import Main from "./Main";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {user_id: '1'}
      // user: ''
    }
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  onClickLogOut = () => {
    this.setState({ user: '' })
  }

  render() {   
    
    return (
      <div className="App">
        {
        this.state.user === ''
        ?
          <Login setUser={this.setUser} onLogin={this.onLogin} />
        :
          <Main user={this.state.user} onClickLogOut={this.onClickLogOut} />
        }
      </div>
    );
  }
}

export default App;
