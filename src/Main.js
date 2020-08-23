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
      lists: [],
      activeList: []
    }
  }

  getNotes = (callback) => {
    const data = { list_id: this.state.activeList.list_id }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }, callback))
  }

  getLists = (callback) => {
    const data = { user_id: this.props.user.user_id }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getlists/", options)
      .then(response => response.json())
      .then(data => this.setState({ lists: data }, callback))
  }

  componentDidMount() {
    this.getLists(function() {
      if(this.state.lists[0]) {
        this.setActiveList(this.state.lists[0].list.list_id)
      }
    }) 
  }

  setActiveList = (list_id) => {
    const data = { list_id: list_id }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }))
  }

  onAddItemToList = (item) => {
    const data = {
      user_id: this.props.user.user_id,
      title: item
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/addlist/", options)
    .then(response => { if(response.ok) { this.getLists() }})
  }

  onListClicked = (item) => {
    const data = { list_id: item.list.list_id }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }))
  }

  AddToNotes = (item) => {
    const data = {
      list_id: this.state.activeList.list_id,
      body: item
    }
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    fetch("http://localhost:3100/addnote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }

  componentDidUpdate() {
    // console.table(this.state.lists)
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
            onAddItemToList={this.onAddItemToList}
          />
          <Notes
            activeList={this.state.activeList}
            AddToNotes={this.AddToNotes}
          />
        </div>

        <Footer />

        {/* Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
      </main>
  )
      }
}

export default Main;