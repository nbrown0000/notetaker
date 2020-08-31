import React from 'react'
import "./List.css";
import listIcon from "../icons/list.png";
import deleteIcon from "../icons/garbage.png";
import editIcon from "../icons/pencil.png";

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
        className="list"
        onClick={() => this.props.onListClicked(item)}
      >

        <img
          className="list__icon"
          src={listIcon}
          alt=""
        />
        <img
          className="list__edit"
          style={buttonStyle}
          onClick={() => this.editListText()}
          src={editIcon}
          alt=""
        />
        <span className="list__text">
          {mode==='display' ? textDisplay : textEdit}
        </span>
        <img
          style={buttonStyle}
          onClick={() => this.props.deleteList(item)}
          className="list__delete"
          src={deleteIcon}
          width="15px"
          alt=""
        />
        <p className="list__count">{item.count}</p>
        
      </li>
    )
  }
}

export default List;