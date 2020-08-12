import React from 'react'
import "./Lists.css";

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
    
    const { onAddItemToList, lists } = this.props;
    const { itemToAdd } = this.state;
    const inputStyle = { width: "70%" }

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