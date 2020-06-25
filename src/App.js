import React from 'react';
import './App.css';
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        "id": 1,
        "name": "John Smith",
        "email": "john@gmail.com",
        "password": "cookies"
      },

      collection: [
        "shopping",
        "sean's birthday",
        "bbq day",
        "bali trip",
        "house move",
        "life goals",
        "gym schedule",
      ],

      activeList: [
        { name: 'bananas', isDone: false },
        { name: 'bread', isDone: false },
        { name: 'milk', isDone: false },
        { name: 'sultana bran', isDone: false }
      ],

      completed: ['clean house']
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
    console.log(this.state.user)
    
    return (
      <div className="App">
        {this.state.user === '' ?
          <Login setUser={this.setUser} onLogin={this.onLogin} />
        :
          <>

            <Header name={this.state.user.name} />
            <Nav />
            <Main
              collection={this.state.collection}
              activeList={this.state.activeList}
              completed={this.state.completed}
            />
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}

          </>
        }
      </div>
    );
  }
}

export default App;
