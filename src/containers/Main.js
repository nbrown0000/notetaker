import React from 'react';
import "./Main.css";
import Header from "../components/Header";
import Lists from "./Lists";
import Notes from "./Notes";
import Footer from "../components/Footer";

class Main extends React.Component {// = ({ collection, activeList, onCollectionClicked }) => {
  constructor() {
    super()
    this.state = {
      lists: [],
      activeList: [],
      view: 'lists'
    }
  }

  setOptions = (data) => {
    return {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
  }

  getNotes = (callback) => {
    const data = { list_id: this.state.activeList.list_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }, callback))
  }

  getLists = (callback) => {
    const data = { user_id: this.props.user.user_id }
    const options = this.setOptions(data);
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
    const options = this.setOptions(data);
    fetch("http://localhost:3100/getnotes/", options)
      .then(response => response.json())
      .then(data => {
        this.setState({ activeList: data })
    })
  }

  onAddItemToList = (item) => {
    const data = {
      user_id: this.props.user.user_id,
      title: item
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/addlist/", options)
    .then(response => { if(response.ok) { this.getLists() }})
  }

  onListClicked = (item) => {
    this.setState({ view: 'notes'})
    this.setActiveList(item.list.list_id)
  }

  AddToNotes = (item) => {
    const data = {
      list_id: this.state.activeList.list_id,
      body: item
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/addnote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }
  
  editNote = (note) => {
    // console.log("Editing ", note)
  }

  saveNote = (note) => {
    const data = {
      note_id: note.note_id,
      body: note.body
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/updatenote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
    }})
  }

  deleteNote = (note) => {
    const data = { note_id: note.note_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/deletenote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }

  saveList = (list) => {
    const data = {
      list_id: list.list_id,
      title: list.title
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/updatelist/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }

  deleteList = (list) => {
    const data = { list_id: list.list.list_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/deletelist/", options)
    .then(response => { if(response.ok) {
      this.setActiveList(this.state.lists[0].list.list_id)
      this.getLists();
    }})
  }

  setView = (view) => {
    this.setState({ view: view })
  }
  

  render () {
    const window = this.props.window;
    const view = this.state.view;
    // console.log(window)

    return (
      <main className="main">
        {
          window.width > 480 ?
          <>
            <Header
              user={this.props.user}
              onClickLogOut={this.props.onClickLogOut}
              window={this.props.window}
            />
            <Lists
              lists={this.state.lists}
              onListClicked={this.onListClicked}
              onAddItemToList={this.onAddItemToList}
              deleteList={this.deleteList}
              saveList={this.saveList}
              window={this.props.window}
            />
            <Notes
              activeList={this.state.activeList}
              AddToNotes={this.AddToNotes}
              deleteNote={this.deleteNote}
              editNote={this.editNote}
              saveNote={this.saveNote}
              setView={this.setView}
            />
            <Footer />
          </>
          : view === 'lists' ?
            <>
              <Header
                user={this.props.user}
                onClickLogOut={this.props.onClickLogOut}
                window={this.props.window}
              />
              <Lists
                lists={this.state.lists}
                onListClicked={this.onListClicked}
                onAddItemToList={this.onAddItemToList}
                deleteList={this.deleteList}
                saveList={this.saveList}
                window={this.props.window}
              />
              <Footer />
            </>
          :
            <>
              <Notes
                activeList={this.state.activeList}
                AddToNotes={this.AddToNotes}
                deleteNote={this.deleteNote}
                editNote={this.editNote}
                saveNote={this.saveNote}
                setView={this.setView}
              />
            </>
        }

      </main>
    )
  }
}

export default Main;