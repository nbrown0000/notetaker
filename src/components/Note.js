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

  handleFocusOut = () => {
    this.props.addNoteToUpdateList({
      note_id: this.props.note.note_id,
      body: this.state.text
    })
  }

  // onSaveInputKeypress = (e) => {
  //   if(e.keyCode === 13) {
  //     this.saveNote(this.props.note)
  //   }
  // }

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

    const textDisplay = <>{note.body}</>
    const textEdit = <span className="note__text-edit">
      <TextareaAutosize
        className="note__textarea"
        type="text"
        value={this.state.text}
        onChange={this.onTextChange}
        // onKeyUp={this.onSaveInputKeypress.bind(this)}
        onBlur={this.handleFocusOut}
      />
      <button
        
      >Delete</button>
    </span>

    return (
      <li className="note">
        <div style={dotStyle}></div>
        <span className="note__text">
          {this.props.mode==='view' ? textDisplay : textEdit}
        </span>
      </li>
    )
  }
}

export default Note;