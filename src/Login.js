import React from 'react';
import "./Login.css";

const Login = () => {
  return (
    <form className="login">
      <p className="login__header"><b>Log in</b> to acess your notes</p>
      <p className="login__username">
        <label>Username:</label>
        <input />
      </p>
      <p className="login__password">
        <label>Password:</label>
        <input />
      </p>
      <p className="login__submit">
        <button className="login__submit-button">Login</button>
      </p>
      <div className="login__register">
        <p className="login__register-message">Don't have an account?</p>
        <button className="login__register-button">Register Now</button>
      </div>
    </form>
  )
}

export default Login;