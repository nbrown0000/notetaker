import React from 'react'
import "./Lists.css";
import listIcon from "./icons/list.png";
import deleteIcon from "./icons/garbage.png";
import plusIcon from "./icons/icons8-plus-240.png";

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToAdd: ''
    }
  }

  onInputKeypress = (e) => {
    if(e.keyCode === 13) {
      this.props.onAddItemToList(this.state.itemToAdd)
      this.setState({ itemToAdd: '' })
    }
  }

  onInputButton = () => {
    this.props.onAddItemToList(this.state.itemToAdd)
    this.setState({ itemToAdd: '' })
  }

  handleItemChange = (event) => {
    this.setState({ itemToAdd: event.target.value })
  }

  render() {
    
    const { lists } = this.props;
    const inputStyle = { width: "70%" }

    return (
      <section className="lists">
        <h3>Your List</h3>
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
                    <img src={listIcon} width="15px" alt="" />
                    {item.list.title}
                    <img
                      onClick={() => this.props.deleteList(item)}
                      className="lists__active-delete"
                      src={deleteIcon}
                      width="15px"
                      alt=""
                    />
                  </p>
                  <p className="lists__active-count">{item.count}</p>
                  
                  
                </li>)
            })
          }
          <li className="lists__add">
            <img src={plusIcon} alt="" />
            <input
              value={this.state.itemToAdd}
              style={inputStyle}
              onChange={this.handleItemChange}
              placeholder="Add a List"
              type="text"
              onKeyUp={this.onInputKeypress.bind(this)}
            />
            <button
              onClick={() => this.onInputButton()}
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