import React from 'react';
import "./Notes.css";
import Note from "./Note";
import plusIcon from "./icons/icons8-plus-240.png";


class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToAdd: ''
    }
  }

  onInputKeypress = (e) => {
    if(e.keyCode === 13) {
      this.props.AddToNotes(this.state.itemToAdd)
      this.setState({ itemToAdd: '' })
    }
  }

  onInputButton = () => {
    this.props.AddToNotes(this.state.itemToAdd)
    this.setState({ itemToAdd: '' })
  }

  handleItemChange = event => {
    this.setState({ itemToAdd: event.target.value })
  }

  

  render() {
    const title = this.props.activeList.title || ''
    const notes = this.props.activeList.notes || []
    
    const inputStyle = { width: "70%" }
    // const deleteIconStyle = { visibility: "visible" }
    
    
    // console.log(this.state.itemToAdd)

    return (
      <section className="notes">
        <h3>{title}</h3>
        <ul className="notes__list">
          {notes.map((note,i) => {
            return (
              <Note
                note={note}
                key={i}
                editNote={this.props.editNote}
                deleteNote={this.props.deleteNote}
              />
            )
          })}
        </ul>
        <ul className="notes__add">
          <li className="notes__add-item">
            <img src={plusIcon} alt="" />
            <input
              onKeyUp={this.onInputKeypress.bind(this)}
              value={this.state.itemToAdd}
              style={inputStyle}
              onChange={this.handleItemChange}
              placeholder="Add a Note"
              type="text"
            />
            <button
              onClick={() => this.onInputButton()}
            >Add</button>
          </li>
        </ul>
      </section>
    )
  }
}

export default Notes;