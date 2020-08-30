import React from 'react'
import listIcon from "./icons/list.png";
import deleteIcon from "./icons/garbage.png";
import editIcon from "./icons/pencil.png";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'display',
      text: ''
    }
  }

  componentDidMount() {
    this.setState({ text: this.props.item.list.title })
  }

  editListText = () => {
    this.setState({ mode: 'edit' })
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  saveList = (list) => {
    // console.log(list)
    this.setState({ mode: 'display' });
    const returnObject = {
      'list_id': list.list.list_id,
      'title': this.state.text
    }
    this.props.saveList(returnObject);
  }

  render() {
    
    const { item } = this.props;
    const { mode } = this.state;

    let buttonStyle = {'visibility': 'visible'}
    if(mode==='edit') { buttonStyle = {'visibility': 'hidden'}}

    const textDisplay = <>{item.list.title}</>
    const textEdit = <>
      <input
        className="lists__item-text-input"
        type="text"
        value={this.state.text}
        onChange={this.onTextChange}
      />
      <button
        onClick={() => this.saveList(item)}
      >Save</button>
    </>

    return (
      <li
        className="lists__active-item"
        onClick={() => this.props.onListClicked(item)}
      >

        <p className="lists__active-name">
          <img
            className="lists__active-name-icon"
            src={listIcon}
            width="15px"
            alt=""
          />
          <img
            className="lists__active-name-edit"
            style={buttonStyle}
            onClick={() => this.editListText()}
            src={editIcon}
            width="15px"
            alt=""
          />
          <span className="lists__active-name-text">
            {mode==='display' ? textDisplay : textEdit}
          </span>
          <img
            style={buttonStyle}
            onClick={() => this.props.deleteList(item)}
            className="lists__active-name-delete"
            src={deleteIcon}
            width="15px"
            alt=""
          />
        </p>
        <p className="lists__active-count">{item.count}</p>
        
      </li>
    )
  }
}

export default List;