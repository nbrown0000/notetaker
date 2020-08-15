import React from 'react'
import "./Lists.css";
import listIcon from "./icons/311-file-4.png";
import deleteIcon from "./icons/164-multiply.png";

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToAdd: ''
    }
  }

  handleItemChange = (event) => {
    this.setState({ itemToAdd: event.target.value })
  }

  render() {
    
    const { onAddItemToList, lists } = this.props;
    const { itemToAdd } = this.state;
    const inputStyle = { width: "70%" }
    const deleteStyle = { visibility: "hidden" }

    return (
      <section className="lists">
      <ul className="lists__active">
        {
        lists.length === 0 ? <></> :
        lists.map((item,i) => {
            return (
              <li
                key={i}
                className="lists__active-item"
                onClick={() => this.props.onListClicked(item)}
              >
                <p className="lists__active-name">
                  <img src={listIcon} width="18px" alt="" />
                  {item.list.title}
                </p>
                <p><img src={deleteIcon} style={deleteStyle} width="18px" alt="" /></p>
                <p className="lists__active-count">{item.count}</p>
              </li>)
          })
        }
        <li className="lists__add">
          <input
            style={inputStyle}
            onChange={this.handleItemChange}
            placeholder="Add a List"
            type="text"
          />
          <button
            onClick={() => onAddItemToList(itemToAdd)}
          >Add</button>
        </li>
        {/* <li>
          <img alt="item" src={calendarIcon} width="15em" />
          Completed
        </li> */}
      </ul>
      </section>
    )
  }
}

export default Lists;