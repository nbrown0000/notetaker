import React from 'react'
import "./Lists.css";
import List from "../components/List";
import plusIcon from "../icons/icons8-plus-240.png";

class Lists extends React.Component {
  constructor() {
    super();
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

  compareLists = (a,b) => {
    if(a.list.list_id < b.list.list_id) { return -1; }
    if(a.list.list_id > b.list.list_id) { return 1; }
    return 0
  }

  render() {
    
    // background: 'none' };
    // if(this.props.window.width > 480) { style = {background: '#bdbdbd'} }
    
    const { lists } = this.props;
    const inputStyle = { width: "70%" }
    const window = this.props.window;

    return (
      <section className="lists" style={window.width > 480 ? {background: '#f8f8f8'} : {background: 'none'}}>
        <ul className="lists__active">
          {
          lists.length === 0 ? <></> :
          lists.sort(this.compareLists).map((item,i) => {
              return (
                <List
                  item={item}
                  key={i}
                  onListClicked={this.props.onListClicked}
                  deleteList={this.props.deleteList}
                  saveList={this.props.saveList}
                />
              )
            })
          }
        </ul>
        {/* <ul className="lists__add">
          <li className="lists__add-item">
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
        </ul> */}
      </section>
    )
  }
}

export default Lists;