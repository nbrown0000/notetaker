import React, { useState } from 'react';
import "./Notes.css";
import Note from "../components/Note";
import AddNote from "../components/AddNote";
import { connect } from "react-redux";
import { setView, updateList, getLists, getNotes, updateNotes } from "../actions"
import backIcon from "../icons/back-button.png";
import editIcon from "../icons/pencil.png";
import DropdownMenu from "../components/DropdownMenu";
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

const mapDispatchToProps = {
  setView, updateList, getLists, getNotes, updateNotes
}

function ConnectedNotes(props) {

  const [mode, setMode] = useState('view');
  const [color, setColor] = useState('');
  const [title, setTitle] = useState('');
  const [notesToUpdate, setNotesToUpdate] = useState([]);
  const [notes, setNotes] = useState([]);

  React.useEffect(() => {
    setTitle(props.notesTitle);
    setColor('#FFF7B6');
    setNotes(props.notes);
  }, [props.notesTitle, props.notes])

  const addNoteToUpdateList = note => {
    setNotesToUpdate([...notesToUpdate, note]);
    setNotes(props.notes)
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
            <DropdownMenu />
          </button>
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