import React from 'react';
import './App.css';
import Main from "./Main";
import Login from "../components/Login";
import Register from "../components/Register";

class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   route: 'login',
    //   user: ''
    // }
    this.state = {
      route: 'main',
      window: { width: 0, height: 0 },
      user: { user_id: 8, username: "Johnny5" }
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
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

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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
              <Main
                user={this.state.user}
                window={this.state.window}
                onClickLogOut={this.onClickLogOut}
              />
        }
      </div>
    );
  }
}

export default App;
