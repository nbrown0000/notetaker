import React from 'react';
import store from "../store";
import './App.css';
import Main from "./Main";
import Login from "../components/Login";
import Register from "../components/Register";
import { setUser, setRoute, setWindow } from "../actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user,
    window: state.window,
    route: state.route
  };
}

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    store.dispatch(setWindow({
      width: window.innerWidth,
      height: window.innerHeight
    }))
    // this.setState({
    //   window: {
    //     width: window.innerWidth,
    //     height: window.innerHeight
    //   }
    // })
  }

  setUser = (user) => {
    store.dispatch(setUser(user));
    // this.setState({ user: user })
  }

  changeRoute = (route) => {
    store.dispatch(setRoute(route))
    // this.setState({ route: route })
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
        this.props.route === 'login'
        ?
          <Login
            setUser={this.setUser}
            changeRoute={this.changeRoute}
          />
        :
          this.props.route === 'register'
          ?
            <Register changeRoute={this.changeRoute} />
          :
              <Main
                // user={this.props.user}
                // window={this.props.window}
                onClickLogOut={this.onClickLogOut}
                // lists={store.getState().lists}
              />
        }
      </div>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);

export default App;
