import React from 'react';
import './App.css';
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'login',
      // user: {user_id: '1'}
      user: ''
    }
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  onClickLogOut = () => {
    this.setState({ user: '', route: 'login' })
  }

  changeRoute = (route) => {
    this.setState({ route: route })
  }

  render() {   
    
    return (
      <div className="App">
        {
        this.state.route === 'login'
        ?
          <Login
            setUser={this.setUser}
            onLogin={this.onLogin}
            changeRoute={this.changeRoute}
          />
        :
          this.state.route === 'register'
          ?
            <Register changeRoute={this.changeRoute} />
          :
            <Main user={this.state.user} onClickLogOut={this.onClickLogOut} />
        }
      </div>
    );
  }
}

export default App;
