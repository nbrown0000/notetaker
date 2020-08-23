import React from 'react';
import "./Notes.css";
import noteIcon from "./icons/document-4.png";
import deleteIcon from "./icons/garbage.png";

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToAdd: ''
    }
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
              <input
                style={inputStyle}
                onChange={this.handleItemChange}
                placeholder="Add a Note"
                type="text"
              />
              <button
                onClick={() => this.props.AddToNotes(this.state.itemToAdd)}
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