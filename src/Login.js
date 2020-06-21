import React from 'react';
import "./Login.css";



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onLogin = () => {
    const { email, password } = this.state;
    if(email === '' || password === '') {
      alert("Must enter a username and password!"); return;
    }
    const data = {
      email: this.state.email,
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
    .then(user => this.props.setUser(user))
    .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div className="login">
        <p className="login__header"><b>Log in</b> to acess your notes</p>
        <p className="login__username">
          <label>Email:</label>
          <input onChange={this.onEmailChange} />
        </p>
        <p className="login__password">
          <label>Password:</label>
          <input onChange={this.onPasswordChange} />
        </p>
        <p className="login__submit">
          <button className="login__submit-button" onClick={this.onLogin}>Login</button>
        </p>
        <div className="login__register">
          <p className="login__register-message">Don't have an account?</p>
          <button className="login__register-button">Register Now</button>
        </div>
      </div>
    )
  }
}

export default Login;