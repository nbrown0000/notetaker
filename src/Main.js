import React from 'react';
import "./Main.css";
import Header from "./Header";
import Lists from "./Lists";
import Notes from "./Notes";
import Footer from "./Footer";

class Main extends React.Component {// = ({ collection, activeList, onCollectionClicked }) => {
  constructor(props) {
    super(props)
    this.state = {
      lists: '',
      // activeList: ''
      activeList: [
        {
            "note_id": 1,
            "body": "onions",
            "list_id": 1
        },
        {
            "note_id": 2,
            "body": "bacon",
            "list_id": 1
        },
        {
            "note_id": 3,
            "body": "bananas",
            "list_id": 1
        },
        {
            "note_id": 4,
            "body": "milk",
            "list_id": 1
        },
        {
            "note_id": 5,
            "body": "eggs",
            "list_id": 1
        },
        {
            "note_id": 6,
            "body": "bread",
            "list_id": 1
        },
        {
            "note_id": 7,
            "body": "cheese",
            "list_id": 1
        },
        {
            "note_id": 8,
            "body": "apples",
            "list_id": 1
        }
    ]
    }
  }

  componentDidMount() {
    const data = {
      user_id: this.props.user.user_id
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getlists/", options)
      .then(response => response.json())
      .then(data => this.setState({ lists: data }))
  }

  onListClicked = (item) => {
    // console.log("Clicked " + item.title)
    const data = {
      list_id: item.list_id
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }))
  }
  
  render () {

    return (

      <main className="main">

        <Header
          user={this.props.user}
          onClickLogOut={this.props.onClickLogOut}
        />
        
        <div className="main__center">
          <Lists
            lists={this.state.lists}
            onListClicked={this.onListClicked}
          />
          <Notes
            activeList={this.state.activeList}
          />
        </div>

        <Footer />

        {/* Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
      </main>
  )
      }
}

export default Main;