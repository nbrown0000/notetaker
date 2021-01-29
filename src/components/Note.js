import React, { useEffect, useState } from 'react';
import "./Note.css";
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from "react-redux";
import {deleteNote} from "../actions/index";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notesTitle: state.notesTitle,
    notesListId: state.notesListId,
    user: state.user,
    window: state.window
  };
}

const ConnectedNote = props => {

  const [text, setText] = useState('');

  useEffect(() => {
    setText(props.note.body)
  }, [props.note.body])

  const handleFocusOut = () => {
    props.addNoteToUpdateList({
      note_id: props.note.note_id,
      body: text
    })
  }

  const onClickDelete = () => {
    props.deleteNote(props.note.note_id, props.notesListId);
  }

  // onSaveInputKeypress = (e) => {
  //   if(e.keyCode === 13) {
  //     this.saveNote(this.props.note)
  //   }
  // }

  const dotStyle = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    marginRight: '10px',
    background: '#FFF7B6',
    border: '1px solid #e8e8e8'
  }

  const { note } = props;

  const textDisplay = <>{note.body}</>
  const textEdit = <span className="note__text-edit">
    <TextareaAutosize
      className="note__textarea"
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      // onKeyUp={this.onSaveInputKeypress.bind(this)}
      onBlur={handleFocusOut}
    />
    <button
      onClick={onClickDelete}
    >Delete</button>
  </span>

  return (
    <li className="note">
      <div style={dotStyle}></div>
      <span className="note__text">
        {props.mode==='view' ? textDisplay : textEdit}
      </span>
    </li>
  )
  
}

const Note = connect(
  mapStateToProps,
  {deleteNote}
)(ConnectedNote);

export default Note;