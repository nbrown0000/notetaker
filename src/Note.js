import React from 'react';
import noteIcon from "./icons/document-4.png";
import deleteIcon from "./icons/garbage.png";
import editIcon from "./icons/pencil.png";

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

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  render() {

    const { note } = this.props;
    const { mode } = this.state;

    let buttonStyle = {'visibility': 'visible'}
    if(mode==='edit') { buttonStyle = {'visibility': 'hidden'}}

    const textDisplay = <>{note.body}</>
    const textEdit = <>
      <input
        className="notes__item-text-input"
        type="text"
        value={this.state.text}
        onChange={this.onTextChange}
      />
      <button onClick={() => this.saveNote(note)}>Save</button>
    </>

    return (
      <li className="notes__item">
        <img
          className="notes__item-icon"
          src={noteIcon}
          width="15px"
          alt=""
        />
        <img
        style={buttonStyle}
          onClick={() => this.editNote(note)}
          className="notes__item-edit"
          src={editIcon}
          alt=""
          width="15px"
        />
        <span className="notes__item-text">
          {mode==='display' ? textDisplay : textEdit}
        </span>
        <img
        style={buttonStyle}
          onClick={() => this.props.deleteNote(note)}
          className="notes__item-delete"
          src={deleteIcon}
          width="15px"
          alt=""
        />
      </li>
    )
  }
}

export default Note;