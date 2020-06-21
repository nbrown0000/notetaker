import React from 'react';
import './App.css';
import HomeScreen from "./HomeScreen";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',

      collection: [
        {
          title: "shopping",
          list: [
            { name: 'bananas', isDone: false },
            { name: 'bread', isDone: false },
            { name: 'milk', isDone: false },
            { name: 'sultana bran', isDone: false }
          ]
        },

        {
          title: "sean's birthday",
          list: [
            { name: 'cake', isDone: false },
            { name: 'candles', isDone: false },
            { name: 'balloons', isDone: false },
            { name: 'bouncing castle', isDone: false }
          ]
        }
      ],

      activeList: ''
    }
  }
  componentDidMount() {
    if(this.state.activeList === '') {
      this.setState({ activeList: this.state.collection[0] })
    }
  }

  toggleCheckmark = (name) => {
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

  setActiveList = (item) => {
    this.state.collection.map(list => {
      if(list.title === item) this.setState({ activeList: list})
      return list;
    })
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  render() {   
    
    return (
      <div className="App">
        {this.state.user === '' ?
          <Login setUser={this.setUser} onLogin={this.onLogin} />
        :
          <HomeScreen
            name={this.state.user.name}  
            collection={this.state.collection}
            activeList={this.state.activeList}
            onCheck={this.toggleCheckmark}
            setActiveList={this.setActiveList}
          />
        }
      </div>
    );
  }
}

export default App;
