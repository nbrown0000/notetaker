import React from 'react'
import "./Lists.css";
import plusIcon from "./icons/add.png";

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listsAddVisible: false,
      itemToAdd: ''
    }
  }

  handleItemChange = (event) => {
    this.setState({ itemToAdd: event.target.value })
  }

  render() {
    


    const iconSize = "18px";
    const listsAddStyle = {
      visibility: "visible"
    }
    const { onAddItemToList, lists } = this.props;
    const { itemToAdd } = this.state;

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
                <p>{item.title}</p>
                <p>10</p>
              </li>)
          })
        }
        <li className="lists__add">
          <img
            src={plusIcon}
            alt="plus"
            width={iconSize}
            height={iconSize}
          />
          <input
            style={listsAddStyle}
            onChange={this.handleItemChange}
            placeholder="Add Item"
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