import React from 'react';
import "./Notes.css";
import Note from "../components/Note";
import backIcon from "../icons/back-button.png";
import editIcon from "../icons/pencil.png";
import dotsIcon from "../icons/show-more-button-with-three-dots.png";
import tickIcon from "../icons/057-check.png";


class Notes extends React.Component {
  constructor(props) {
    const { isNewList, title } = props.activeList
    super()
    this.state = {
      itemToAdd: '',
      mode: 'view',
      color: "#FFF7B6",
      title: isNewList ? '' : title
    }
  }

  componentDidMount() {
    this.setState({ title: '' })
  }

  onTitleInputChange = (e) => {
    this.setState({ title: e.target.value })
  }

  updateListTitle = () => {
    this.props.saveList({
      list_id: this.props.activeList.list_id,
      title: this.state.title
    })
  }

  setNoteBg = (hex) => {
    this.setState({ background: hex })
  }

  editNotes = () => {
    this.setState({ mode: 'edit', title: this.props.activeList.title })
  }

  updateNotes = () => {
    this.updateListTitle();
    this.setState({ title: this.props.activeList.title })
    this.setState({ mode: 'view' });
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

  backToLists = () => {
    this.setState({ mode: 'view', title: this.props.activeList.title })
    this.props.setView('lists')
  }

  render() {
    

    const BACKBUTTON =
      <button className="notes__back" onClick={() => this.backToLists()}>
        <img src={backIcon} alt="Back" />
      </button>;
    
    const propTitle = this.props.activeList.title;
    const notes = this.props.activeList.notes || [];
    const notesStyle = { background: this.state.color };
    const mode = this.state.mode;
    const isNewList = this.props.activeList.isNewList;

    return (
      <section className="notes"  >
        <header className="notes__nav" style={notesStyle}>
          
          <section className="notes__header-leftsection">
            {this.props.window.width < 481 && BACKBUTTON}

            {isNewList || mode==='edit' ?
              <input
                className="notes__heading-edit"
                value={this.state.title}
                onChange={this.onTitleInputChange}
              />
            :
            <h1 className="notes__heading">{propTitle}</h1>
          }
          </section>

          <section className="notes__header-rightsection">
          {isNewList || mode==='edit' ?
            <button className="notes__update" onClick={() => this.updateNotes()}>
              <img src={tickIcon} alt="accept" />
            </button>
          :
            <button className="notes__edit" onClick={this.editNotes}>
              <img src={editIcon} alt="Edit" />
            </button>
          }
            <button className="notes__dotsmenu">
              <img src={dotsIcon} alt="Dotsmenu"/>
            </button>
          </section>
          
        </header>
        <ul className="notes__list" >
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