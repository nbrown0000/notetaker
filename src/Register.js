import React from 'react';
import "./Login.css";



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onRegister = () => {
    const { username, email, password } = this.state;
    if(username === '' || email === '' || password === '') {
      alert("Must enter a username, email and password!"); return;
    }
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/register/", options)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Unable to register user.");
        throw new Error("Unable to register user."); }
    })
    .then(user => {
      this.props.setUser(user)
      this.props.changeRoute('login')
    })
    .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div className="login">
        <p className="login__header"><b>Register</b> a new account</p>
        <p className="login__username">
          <label>Username:</label>
          <input onChange={this.onUsernameChange} />
        </p>
        <p className="login__email">
          <label>Email:</label>
          <input onChange={this.onEmailChange} />
        </p>
        <p className="login__password">
          <label>Password:</label>
          <input onChange={this.onPasswordChange} />
        </p>
        <p className="login__submit">
          <button className="login__submit-button" onClick={this.onRegister}>Register</button>
        </p>
        <div className="login__register">
          <p className="login__register-message">Already have an account?</p>
          <button
            className="login__register-button"
            onClick={() => this.props.changeRoute('login')}
          >Login</button>
        </div>
      </div>
    )
  }
}

export default Register;