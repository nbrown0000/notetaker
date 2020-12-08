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
    fetch("http://localhost:3100/note/getnotes/", options)
      .then(response => response.json())
      .then(data => this.setState({ activeList: data }, callback))
  }

  getLists = (callback) => {
    const data = { user_id: this.props.user.user_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/list/getlists/", options)
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

  setActiveList = (list_id, isNewList, callback) => {
    const data = { list_id: list_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/note/getnotes/", options)
      .then(response => response.json())
      .then(data => {
        const listData = {
          ...data, isNewList: isNewList
        }
        this.setState({ activeList: listData }, callback)
    })
  }

  addList = (title) => {
    const data = {
      user_id: this.props.user.user_id,
      title: title
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/list/addlist/", options)
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
    fetch("http://localhost:3100/note/addnote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }

  saveNote = (note) => {
    const data = {
      note_id: note.note_id,
      body: note.body
    }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/note/updatenote/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
    }})
  }

  deleteNote = (note) => {
    const data = { note_id: note.note_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/note/deletenote/", options)
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
    fetch("http://localhost:3100/list/updatelist/", options)
    .then(response => { if(response.ok) {
      this.getNotes();
      this.getLists();
    }})
  }

  deleteList = (list) => {
    const data = { list_id: list.list.list_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/list/deletelist/", options)
    .then(response => { if(response.ok) {
      this.setActiveList(this.state.lists[0].list.list_id)
      this.getLists();
    }})
  }

  setView = (view) => {
    this.setState({ view: view })
  }

  onClickAddList = () => {
    this.addList("");

    const data = { user_id: this.props.user.user_id }
    const options = this.setOptions(data);
    fetch("http://localhost:3100/list/mostrecentlist", options)
    .then(response => response.json())
    .then(activeList => {
      this.getLists();
      this.setActiveList(activeList.list_id, true);
      this.setState({ view: 'notes'})
    })
  }
  

  render () {
    const window = this.props.window;
    const view = this.state.view;

    return (
      <main className="main">
        {
          window.width > 480 ?
          <>
            <Header
              user={this.props.user}
              onClickLogOut={this.props.onClickLogOut}
              window={this.props.window}
              onClickAddList={this.onClickAddList}
            />
            <Lists
              lists={this.state.lists}
              onListClicked={this.onListClicked}
              addList={this.addList}
              deleteList={this.deleteList}
              saveList={this.saveList}
              window={this.props.window}
            />
            <Notes
              activeList={this.state.activeList}
              saveList={this.saveList}
              AddToNotes={this.AddToNotes}
              deleteNote={this.deleteNote}
              editNote={this.editNote}
              saveNote={this.saveNote}
              setView={this.setView}
              window={this.props.window}
            />
            <Footer />
          </>
          : view === 'lists' ?
            <>
              <Header
                user={this.props.user}
                onClickLogOut={this.props.onClickLogOut}
                window={this.props.window}
                onClickAddList={this.onClickAddList}
              />
              <Lists
                lists={this.state.lists}
                onListClicked={this.onListClicked}
                addList={this.addList}
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
                saveList={this.saveList}
                AddToNotes={this.AddToNotes}
                deleteNote={this.deleteNote}
                editNote={this.editNote}
                saveNote={this.saveNote}
                setView={this.setView}
                window={this.props.window}
              />
            </>
        }

      </main>
    )
  }
}

export default Main;