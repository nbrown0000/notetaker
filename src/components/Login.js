import React from 'react';
import "./Login.css";



class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onLogin = () => {
    const { username, password } = this.state;
    if(username === '' || password === '') {
      alert("Must enter a username and password!"); return;
    }
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/login/", options)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Username or password incorrect.");
        throw new Error("Username or password incorrect."); }
    })
    .then(user => {
      this.props.setUser(user)
      this.props.changeRoute('main')
    })
    .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div className="login">
        <h1 className="login__title">Note<span className="emphasise">Taker</span></h1>
        <p className="login__header"><b>Log in</b> to acess your notes</p>
        <div className="login__form">
          <p className="login__username">
            <label>Username: </label>
            <input onChange={this.onUsernameChange} />
          </p>
          <p className="login__password">
            <label>Password: </label>
            <input type="password" onChange={this.onPasswordChange} />
          </p>
          <p className="login__submit">
            <button className="login__submit-button" onClick={this.onLogin}>Login</button>
          </p>
        </div>
        <div className="login__register">
          <button
            className="login__register-button"
            onClick={() => this.props.changeRoute('register')}
          >Don't have an account?</button>
        </div>
      </div>
    )
  }
}

export default Login;