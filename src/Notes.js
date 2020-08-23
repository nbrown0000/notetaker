import React from 'react';
import "./Notes.css";

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
    const inputStyle = { width: "70%" }
    const title = this.props.activeList.title || ''
    const notes = this.props.activeList.notes || []
    
    // console.log(this.state.itemToAdd)

    return (
      <section className="notes">
        <h3>{title}</h3>
        {
          <ul className="notes__list">
            {notes.map((note,i) => {
              return (
              <li className="notes__item" key={i}>
                {note.body}
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