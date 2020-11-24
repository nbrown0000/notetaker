import React from 'react';
import "./Note.css";
import TextareaAutosize from 'react-textarea-autosize';

class Note extends React.Component {
  constructor() {
    super();
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

    const dotStyle = {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      marginRight: '10px',
      background: '#FFF7B6',
      border: '1px solid #e8e8e8'
    }

    const { note } = this.props;
    const { mode } = this.state;

    let buttonStyle = {'visibility': 'visible'}
    if(mode==='edit') { buttonStyle = {'visibility': 'hidden'}}

    const textDisplay = <>{note.body}</>
    const textEdit = <span className="note__text-edit">
      <TextareaAutosize
        className="note__textarea"
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
        {/* <img
          className="note__icon"
          src={noteIcon}
          alt=""
        /> */}
        {/* <img
          style={buttonStyle}
          onClick={() => this.editNote(note)}
          className="note__edit"
          src={editIcon}
          alt=""
        /> */}
        <div style={dotStyle}></div>
        <span className="note__text">
          {mode==='display' ? textDisplay : textEdit}
        </span>
        {/* <img
        style={buttonStyle}
          onClick={() => this.props.deleteNote(note)}
          className="note__delete"
          src={deleteIcon}
          width="15px"
          alt=""
        /> */}
      </li>
    )
  }
}

export default Note;