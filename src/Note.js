import React from 'react';
import noteIcon from "./icons/document-4.png";
import deleteIcon from "./icons/garbage.png";
import editIcon from "./icons/pencil.png";

class Note extends React.Component {
  render() {
    const { note } = this.props;
    return (
      <li className="notes__item">
        <img
          className="notes__item-icon"
          src={noteIcon}
          width="15px"
          alt=""
        />
        <img
          onClick={() => this.props.editNote(note)}
          className="notes__item-edit"
          src={editIcon}
          alt=""
          width="15px"
        />
        <span className="notes__item-text">{note.body}</span>
        <img
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