import React, { useState, useEffect } from 'react';
import "./Notes.css";
import Note from "../components/Note";
import AddNote from "../components/AddNote";
import { connect } from "react-redux";
import { setView, updateList, getLists, getNotes, updateNotes, setIsNewList } from "../actions"
import backIcon from "../icons/back-button.png";
import editIcon from "../icons/pencil.png";
import DropdownMenu from "../components/DropdownMenu";
import tickIcon from "../icons/057-check.png";

const mapStateToProps = state => {
  return {
    lists: state.lists,
    isNewList: state.isNewList,
    notes: state.notes,
    notesTitle: state.notesTitle,
    notesListId: state.notesListId,
    user: state.user,
    window: state.window
  };
}

const mapDispatchToProps = {
  setView, updateList, getLists, getNotes, updateNotes, setIsNewList
}

function ConnectedNotes(props) {

  const [mode, setMode] = useState('view');
  const [color, setColor] = useState('');
  const [title, setTitle] = useState('');
  const [notesToUpdate, setNotesToUpdate] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {

    setTitle(props.notesTitle);      
    setNotes(props.notes);
    setColor('#FFF7B6');

    if(props.isNewList) {
      setMode("edit")
    }

  }, [props.notesTitle, props.notes, props.isNewList])

  const addNoteToUpdateList = note => {
    setNotesToUpdate([...notesToUpdate, note]);
    setNotes(props.notes)
  }

  const updateNotes = async () => {
    await props.updateList(props.notesListId, title);
    await props.updateNotes(props.notesListId, notesToUpdate);
    await props.getLists(props.user.user_id);
    await props.getNotes(props.notesListId);
    setMode('view')
    props.setIsNewList(false);
  }

  const onTitleLoseFocus = async () => {
    await props.updateList(props.notesListId, title);
    await props.getNotes(props.notesListId);
    props.setIsNewList(false);
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
          {mode==='edit' ?
            <input
              autoFocus
              className="notes__heading-edit"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={onTitleLoseFocus}
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
          <div className="notes__dotsmenu">
            <DropdownMenu />
          </div>
        </section>
        
      </header>
      {mode==='edit' ?
        <AddNote addNoteToUpdateList={addNoteToUpdateList} />
      :
        <></>
      }
      <ul className="notes__list" >
        {notes.sort(compareNotes).map((note,i) => {
          
          return (
            <Note
              note={note}
              key={i}
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

const Notes = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedNotes);

export default Notes;