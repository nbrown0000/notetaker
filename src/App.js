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
      user: '',
      collection: '',
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

  fetchUserCollections = () => {
    const user = this.state.user;
    const data = {
      id: user.id
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getcollections/", options)
    .then(response => response.json())
    .then(data => this.setState({ collection: data}))
  }

  setUser = (user) => {
    this.setState({ user: user })
    this.fetchUserCollections();
  }

  render() {   
    // console.log(this.state.user)
    
    return (
      <div className="App">
        {this.state.user === '' ?
          <Login setUser={this.setUser} onLogin={this.onLogin} />
        :
          <>

            <Header firstname={this.state.user.firstname} />
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
