import React from 'react';
import "./Notes.css";
import noteIcon from "./icons/document-4.png";
import deleteIcon from "./icons/garbage.png";
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
        {
          <ul className="notes__list">
            {notes.map((note,i) => {
              return (
              <li className="notes__item" key={i}>
                <img src={noteIcon} width="15px" alt="" />
                {note.body}
                <img
                  onClick={() => this.props.deleteNote(note)}
                  // style={deleteIconStyle}
                  className="notes__item-delete"
                  src={deleteIcon}
                  width="15px"
                  alt=""
                />
              </li>
              )
            })}
            <li className="notes__add">
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
        }
      </section>
      // <li className="activelist__item">
      //   <input
      //     className="activelist__item-checkbox"
      //     type="checkbox"
      //     onClick={() => onCheck(item.name)}
      //     defaultChecked={item.isDone}
      //   />
      //   <span
      //     className="activelist__item-name"
      //     style={nameStyle}
      //   > {item.name} </span>
      // </li>
    )
  }
}

export default Notes;