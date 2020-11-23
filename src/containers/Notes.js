import React from 'react';
import "./Notes.css";
import Note from "../components/Note";
import backIcon from "../icons/back-button.png";
import editIcon from "../icons/pencil.png";
import dotsIcon from "../icons/show-more-button-with-three-dots.png";
import tickIcon from "../icons/057-check.png";


class Notes extends React.Component {
  constructor() {
    super()
    this.state = {
      itemToAdd: '',
      mode: 'view',
      color: "#FFF7B6"
    }
  }

  setNoteBg = (hex) => {
    this.setState({ background: hex })
  }

  editNotes = () => {
    this.setState({ mode: 'edit' })
  }

  updateNotes = () => {
    this.setState({ mode: 'view' })
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

  compareNotes = (a,b) => {
    if(a.note_id < b.note_id) { return -1; }
    if(a.note_id > b.note_id) { return 1; }
    return 0
  }

  setView = (view) => {
    this.props.setView(view);
  }

  render() {
    const title = this.props.activeList.title || "You don't have any lists"
    const notes = this.props.activeList.notes || []
    const notesHeaderStyle = { background: this.state.color }

    return (
      <section className="notes" >
        <header className="notes__nav" style={notesHeaderStyle}>
          
          <section className="notes__header-leftsection">
            {this.state.mode === 'view' ?
              <>
              <button className="notes__back" onClick={() => this.setView('lists')}>
                <img src={backIcon} alt="Back" />
              </button>
              <h1 className="notes__heading">{title}</h1>
              </>
            :
              <>
              <button className="notes__update" onClick={() => this.updateNotes()}>
                <img src={tickIcon} alt="accept" />
              </button>
              <input className="notes__heading-edit" placeholder={title} />
              </>
            }
            
          </section>

          <section className="notes__header-rightsection">
          {this.state.mode === 'view' ?
            <button className="notes__edit" onClick={this.editNotes}>
              <img src={editIcon} alt="Edit" />
            </button>
          :
            <></>
          }
            <button className="notes__dotsmenu">
              <img src={dotsIcon} alt="Dotsmenu"/>
            </button>
          </section>
          
        </header>
        <ul className="notes__list">
          {notes.sort(this.compareNotes).map((note,i) => {
            return (
              <Note
                note={note}
                key={i}
                editNote={this.props.editNote}
                deleteNote={this.props.deleteNote}
                saveNote={this.props.saveNote}
                color={this.state.color}
              />
            )
          })}
        </ul>
        {/* <ul className="notes__add">
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
        </ul> */}
      </section>
    )
  }
}

export default Notes;