import React from 'react';
import './App.css';
import HomeScreen from "./HomeScreen";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'user1',
      activeList: {
        name: 'shopping',
        list: [
          { name: 'apples', isDone: true },
          { name: 'bananas', isDone: false },
          { name: 'watermelon', isDone: false },
          { name: 'kiwi fruit', isDone: true }
        ]
      }
    }
  }

  onCheck = (name) => {
    this.setState(prevState => ({
      activeList: {
        ...prevState.activeList,
        list: prevState.activeList.list.map(el => {
          return (
            el.name === name && el.isDone 
            ?
            {...el, isDone: false}
            :
              el.name === name && !el.isDone
              ?
                {...el, isDone: true}
              :
                el
          )
        })
      }
    }))
  }

  render() {
    return (
      <div className="App">
        {this.state.username === '' ?
          <Login />
        :
          <HomeScreen
            activeList={this.state.activeList}
            username={this.state.username}
            onCheck={this.onCheck}
          />
        }
      </div>
    );
  }
}

export default App;
