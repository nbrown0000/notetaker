import React, { useEffect, useState } from 'react';
import "./AddNote.css";
import { connect } from "react-redux";
import { addNote, getNotes } from "../actions";

const mapStateToProps = state => {
  return {
    notesListId: state.notesListId
  };
}

const mapDispatchToProps = {
  addNote, getNotes
}

const ConnectedAddNote = (props) => {

  const [mode, setMode] = useState('')
  const [input, setInput] = useState('')
  useEffect(() => {
    setMode('view')
  }, [])

  const plusStyle = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    marginRight: '10px',
    // background: '#FFF7B6',
    border: '1px solid #e8e8e8'
  }

  const onClickOk = async () => {
    console.log("Adding " + input);
    await props.addNote(props.notesListId, input);
    await props.getNotes(props.notesListId);
    setMode('view');
    setInput('');
  }

  return (
    <span className="addnote">
      <div style={plusStyle}>+</div>
      
      {
      mode === 'edit' ?
        <>
        <input
          autoFocus
          type="text"
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => onClickOk()}>OK</button>
        </>
      :
        <p onClick={() => setMode('edit')}>Add Note</p>
      }
      
    </span>
  )
}

const AddNote = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAddNote);

export default AddNote;