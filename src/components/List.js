import React from 'react'
import "./List.css";

class List extends React.Component {
  constructor(props) {
    super();
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
    const listStyle = {
      borderBottom: '1px solid #e8e8e8',
    }
    
    const { item } = this.props;
    // const { mode } = this.state;

    // const buttonStyle = mode==='edit' ? {'visibility': 'hidden'} : {'visibility': 'visible'}
    // const textDisplay = <>{item.list.title}</>
    // const textEdit = <>
    //   <input
    //     className="lists__item-text-input"
    //     type="text"
    //     value={this.state.text}
    //     onChange={this.onTextChange}
    //   />
    //   <button
    //     onClick={() => this.saveList(item)}
    //   >Save</button>
    // </>

    return (
      <li
        className="list"
        onClick={() => this.props.onListClicked(item)}
        style={listStyle}
      >
        <span className="list__text">{item.list.title}</span>
        <p className="list__count">{item.count}</p> 
      </li>
    )
  }
}

export default List;