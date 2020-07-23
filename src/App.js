import React from 'react';
import './App.css';
import Header from "./Header";
// import Nav from "./Nav";
import Main from "./Main";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      collection: '',
      activeList: [],
      completed: ['clean house']
    }
  }
  componentDidMount() {

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

  onCollectionClicked = (collectionId) => {
    const data = {
      id: collectionId
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getlists/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }))
  }

  onClickActiveListItem = (activeListItemId) => {
    console.log("toggle", activeListItemId)
  }

  onClickLogOut = () => {
    this.setState({ user: '' })
  }

  render() {   
    // console.log(this.state.user)
    // console.table(this.state.collection)
    
    return (
      <div className="App">
        {this.state.user === '' ?
          <Login setUser={this.setUser} onLogin={this.onLogin} />
        :
          <>

            <Header
              firstname={this.state.user.firstname}
              onClickLogOut={this.onClickLogOut}
            />
            {/* <Nav /> */}
            <Main
              collection={this.state.collection}
              activeList={this.state.activeList}
              completed={this.state.completed}
              onCollectionClicked={this.onCollectionClicked}
              onClickActiveListItem={this.onClickActiveListItem}
            />
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}

          </>
        }
      </div>
    );
  }
}

export default App;
