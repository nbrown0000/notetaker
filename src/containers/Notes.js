import React from 'react';
import "./Notes.css";
import Note from "../components/Note";
import { connect } from "react-redux";
import { setView, updateList, getLists, getNotes } from "../actions"

import backIcon from "../icons/back-button.png";
import editIcon from "../icons/pencil.png";
import dotsIcon from "../icons/show-more-button-with-three-dots.png";
import tickIcon from "../icons/057-check.png";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notesTitle: state.notesTitle,
    notesListId: state.notesListId,
    user: state.user,
    window: state.window
  };
}

class ConnectedNotes extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      itemToAdd: '',
      mode: 'view',
      color: "#FFF7B6",
      title: this.props.notesTitle,
      notesToUpdate: []
    }
  }

  backToLists = () => {
    this.props.setView('lists')
  }

  editNotes = () => {
    this.setState({ mode: 'edit' })
  }

  onTitleInputChange = (e) => {
    this.setState({ title: e.target.value })
  }

  updateNotes = () => {
    // Update Title (call api to change list title)
    this.props.updateList(this.props.notesListId, this.state.title);
    this.props.getLists(this.props.user.user_id)
    this.props.getNotes(this.props.notesListId);
    this.setState({title: this.props.notesTitle})


    // this.updateListTitle();
    // // this.updateListNotes();
    // this.setState({ title: store.getState().activeList.title })
    this.setState({ mode: 'view' });
  }

  compareNotes = (a,b) => {
    if(a.note_id < b.note_id) { return -1; }
    if(a.note_id > b.note_id) { return 1; }
    return 0
  }

  render() {
    // console.log(this.state.title)
    // console.log(this.props.notesTitle)
    console.log(this.props)


    const BACKBUTTON =
      <button className="notes__back" onClick={() => this.backToLists()}>
        <img src={backIcon} alt="Back" />
      </button>;
    
    
    const notesStyle = { background: this.state.color };
    const { mode } = this.state;
    const isNewList = null;
    // const title = this.props.notesTitle;
    

    return (
      <section className="notes"  >
        <header className="notes__nav" style={notesStyle}>
          
          <section className="notes__header-leftsection">
            {this.props.window.width < 481 && BACKBUTTON}
            {/* {isNewList===true || mode==='edit' ? */}
            {isNewList===true || mode==='edit' ?
              <input
                autoFocus
                className="notes__heading-edit"
                defaultValue={this.props.notesTitle}
                onChange={this.onTitleInputChange}
              />
            :
              <h1 className="notes__heading">{this.props.notesTitle}</h1>
            }
          </section>

          <section className="notes__header-rightsection">
          {/* {isNewList || mode==='edit' ? */}
          {mode==='edit' ?
            <button className="notes__update" onClick={() => this.updateNotes()}>
              <img src={tickIcon} alt="accept" />
            </button>
          :
            <button className="notes__edit" onClick={this.editNotes}>
              <img src={editIcon} alt="Edit" />
            </button>
          }
            <button className="notes__dotsmenu">
              <img src={dotsIcon} alt="Dotsmenu"/>
            </button>
          </section>
          
        </header>
        <ul className="notes__list" >
          {this.props.notes.sort(this.compareNotes).map((note,i) => {
            return (
              <Note
                note={note}
                key={i}
                editNote={this.props.editNote}
                deleteNote={this.props.deleteNote}
                saveNote={this.props.saveNote}
                color={this.state.color}
                mode={this.state.mode}
                addNoteToUpdate={this.addNoteToUpdate}
              />
            )
          })}
        </ul>
      </section>
    )
  }
}

const Notes = connect(
  mapStateToProps,
  {setView, updateList, getLists, getNotes}
)(ConnectedNotes);

export default Notes;

  // setOptions = (data) => {
  //   return {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" }
  //   }
  // }

  // saveNote = (note) => {
  //   const data = {
  //     note_id: note.note_id,
  //     body: note.body
  //   };
  //   const options = this.setOptions(data);
  //   fetch("http://localhost:3100/note/updatenote/", options)
  //   .then(response => { if(response.ok) {
  //     this.getNotes();
  //   }})
  // }

  // AddToNotes = (item) => {
  //   const data = {
  //     list_id: this.state.activeList.list_id,
  //     body: item
  //   }
  //   const options = this.setOptions(data);
  //   fetch("http://localhost:3100/note/addnote/", options)
  //   .then(response => { if(response.ok) {
  //     this.getNotes();
  //     this.getLists();
  //   }})
  // }

  // deleteNote = (note) => {
  //   const data = { note_id: note.note_id }
  //   const options = this.setOptions(data);
  //   fetch("http://localhost:3100/note/deletenote/", options)
  //   .then(response => { if(response.ok) {
  //     this.getNotes();
  //     this.getLists();
  //   }})
  // }

  // saveList = (list) => {
  //   // console.log(list)
  //   const data = {
  //     list_id: list.list_id,
  //     title: list.title
  //   }
  //   const options = this.setOptions(data);
  //   fetch("http://localhost:3100/list/updatelist/", options)
  //   .then(response => { if(response.ok) {
  //     // this.getLists();
  //     this.getNotes();
  //   }})
  // }

  // updateListTitle = () => {
  //   const activeList = store.getState().activeList;
  //   this.saveList({
  //     list_id: activeList.list.list_id,
  //     title: this.state.title
  //   })
  // }

  // updateListNotes = () => {
  //   const { notesToUpdate } = this.state;
  //   // console.log("...Updating Notes: ")
  //   for (const index in notesToUpdate) {
  //     // console.log(notesToUpdate[index])
  //     this.props.saveNote(notesToUpdate[index])
  //   }
  //   this.setState({ notesToUpdate: [] })
  // }

  // updateList = () => {
  //   this.updateListTitle();
  //   // this.updateListNotes();
  //   this.setState({ title: store.getState().activeList.title })
  //   this.setState({ mode: 'view' });
  // }

  // onTitleInputChange = (e) => {
  //   this.setState({ title: e.target.value })
  // }

  // onInputKeypress = (e) => {
  //   if(e.keyCode === 13) {
  //     this.props.AddToNotes(this.state.itemToAdd)
  //     this.setState({ itemToAdd: '' })
  //   }
  // }

  // onInputButton = () => {
  //   this.props.AddToNotes(this.state.itemToAdd)
  //   this.setState({ itemToAdd: '' })
  // }

  // handleItemChange = event => {
  //   this.setState({ itemToAdd: event.target.value })
  // }

  // compareNotes = (a,b) => {
  //   if(a.note_id < b.note_id) { return -1; }
  //   if(a.note_id > b.note_id) { return 1; }
  //   return 0
  // }

  // editNotes = () => {
  //   this.setState({ mode: 'edit', title: store.getState().activeList.list.title })
  // }

  // backToLists = () => {
  //   this.props.setView('lists')
  // }

  // addNoteToUpdate = (note) => {
  //   const { notesToUpdate } = this.state;
    
  //   var found = false;
  //   for (const index in notesToUpdate) {
  //     if(notesToUpdate[index].note_id === note.note_id) { found = true; }
  //   }
  //   if(!found) {
  //     // add note to update list
  //     this.setState(prevState => ({
  //       notesToUpdate: [
  //         ...prevState.notesToUpdate,
  //         note
  //       ]
  //     }))
  //   }
  // }