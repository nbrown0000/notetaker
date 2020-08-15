import React from 'react';
import "./Notes.css";

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToAdd: ''
    }
  }

  render() {
    const inputStyle = { width: "70%" }

    return (
      <section className="notes">
        {
          <ul className="notes__list">
            {this.props.activeList.map((note,i) => {
              return (
              <li className="notes__item" key={i}>
                {note.body}
              </li>
              )
            })}
            <li className="notes__add">
              <input
                style={inputStyle}
                // onChange={this.handleItemChange}
                placeholder="Add a Note"
                type="text"
              />
              <button
                // onClick={() => onAddItemToNote(itemToAdd)}
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