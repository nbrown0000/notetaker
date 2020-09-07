import React from 'react';
import "./Note.css";
import noteIcon from "../icons/document-4.png";
import deleteIcon from "../icons/garbage.png";
import editIcon from "../icons/pencil.png";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'display',
      text: ''
    }
  }

  componentDidMount() {
    this.setState({ text: this.props.note.body })
  }

  editNote = (note) => {
    this.setState({ mode: 'edit' });
    this.setState({ text: this.props.note.body })
    this.props.editNote(note);
  }

  saveNote = (note) => {
    this.setState({ mode: 'display' });
    const returnObject = {
      'note_id': note.note_id,
      'body': this.state.text
    }
    this.props.saveNote(returnObject);
  }

  onSaveInputKeypress = (e) => {
    if(e.keyCode === 13) {
      this.saveNote(this.props.note)
    }
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  render() {

    const { note } = this.props;
    const { mode } = this.state;

    let buttonStyle = {'visibility': 'visible'}
    if(mode==='edit') { buttonStyle = {'visibility': 'hidden'}}

    const textDisplay = <>{note.body}</>
    const textEdit = <span className="note__edit-text">
      <textarea
        className="note__item-text-input"
        type="text"
        value={this.state.text}
        onChange={this.onTextChange}
        onKeyUp={this.onSaveInputKeypress.bind(this)}
      />
      <button
        onClick={() => this.saveNote(note)}
      >Save</button>
    </span>

    return (
      <li className="note">
        <img
          className="note__icon"
          src={noteIcon}
          alt=""
        />
        <img
          style={buttonStyle}
          onClick={() => this.editNote(note)}
          className="note__edit"
          src={editIcon}
          alt=""
        />
        <span className="note__text">
          {mode==='display' ? textDisplay : textEdit}
        </span>
        <img
        style={buttonStyle}
          onClick={() => this.props.deleteNote(note)}
          className="note__delete"
          src={deleteIcon}
          width="15px"
          alt=""
        />
      </li>
    )
  }
}

export default Note;