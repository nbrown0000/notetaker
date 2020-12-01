import React from 'react'
import "./Lists.css";
import List from "../components/List";
// import AddList from "../components/AddList"
// import plusIcon from "../icons/icons8-plus-240.png";

class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      itemToAdd: '',
      color: "#FFF7B6"
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
    const { lists } = this.props;

    return (
      <section className="lists" >
        {/* <AddList /> */}
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
                  color={this.state.color}
                  window={this.props.window}
                />
              )
            })
          }
        </ul>
      </section>
    )
  }
}

export default Lists;