import React, { useState } from 'react';
import "./Notes.css";
import Note from "../components/Note";
import { connect } from "react-redux";
import { setView, updateList, getLists, getNotes, updateNotes } from "../actions"

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

function ConnectedNotes(props) {

  const [mode, setMode] = useState('view');
  const [color, setColor] = useState('#FFF7B6');
  const [title, setTitle] = useState('');
  const [notesToUpdate, setNotesToUpdate] = useState([]);
  React.useEffect(() => {
    setTitle(props.notesTitle);
  }, [props.notesTitle])

  const addNoteToUpdateList = note => {
    setNotesToUpdate([...notesToUpdate, note])
  }

  const updateNotes = async () => {
    await props.updateList(props.notesListId, title);
    await props.updateNotes(props.notesListId, notesToUpdate);
    props.getLists(props.user.user_id);
    props.getNotes(props.notesListId);
    setMode('view')
  }

  const compareNotes = (a,b) => {
    if(a.note_id < b.note_id) { return -1; }
    if(a.note_id > b.note_id) { return 1; }
    return 0
  }


  const BACKBUTTON =
    <button className="notes__back" onClick={() => props.setView('lists')}>
      <img src={backIcon} alt="Back" />
    </button>;
    
  const notesStyle = { background: color };
  const isNewList = null;

  return (
    <section className="notes"  >
      <header className="notes__nav" style={notesStyle}>
        
        <section className="notes__header-leftsection">
          {props.window.width < 481 && BACKBUTTON}
          {/* {isNewList===true || mode==='edit' ? */}
          {isNewList===true || mode==='edit' ?
            <input
              autoFocus
              className="notes__heading-edit"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          :
            <h1 className="notes__heading">{title}</h1>
          }
        </section>

        <section className="notes__header-rightsection">
        {/* {isNewList || mode==='edit' ? */}
        {mode==='edit' ?
          <button className="notes__update" onClick={() => updateNotes()}>
            <img src={tickIcon} alt="accept" />
          </button>
        :
          <button className="notes__edit" onClick={() => setMode('edit')}>
            <img src={editIcon} alt="Edit" />
          </button>
        }
          <button className="notes__dotsmenu">
            <img src={dotsIcon} alt="Dotsmenu"/>
          </button>
        </section>
        
      </header>
      <ul className="notes__list" >
        {props.notes.sort(compareNotes).map((note,i) => {
          return (
            <Note
              note={note}
              key={i}
              editNote={props.editNote}
              deleteNote={props.deleteNote}
              saveNote={props.saveNote}
              color={color}
              mode={mode}
              addNoteToUpdateList={addNoteToUpdateList}
            />
          )
        })}
      </ul>
    </section>
  )
}
// }

const Notes = connect(
  mapStateToProps,
  {setView, updateList, getLists, getNotes, updateNotes}
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