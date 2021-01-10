import React from 'react'
import "./List.css";
import { connect } from "react-redux";
import { getNotes, setView, setNotesTitle, setNotesListId } from "../actions"

const mapStateToProps = state => {
  return {
    user: state.user,
    lists: state.lists
  };
}

class ConnectedList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      mode: 'display',
      text: ''
    }
  }

  componentDidMount() {
    this.setState({ text: this.props.item.title })
  }

  editListText = () => {
    this.setState({ mode: 'edit' })
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  onListClicked = (item) => {
    this.props.getNotes(item.list_id);
    // this.props.setNotesTitle(item.list_id);
    // this.props.setNotesListId(item.list_id);
    this.props.setView('notes')
  }

  render() {
    const listStyle = {
      borderBottom: '1px solid #e8e8e8',
      height: '30px'
    }
    
    const { item } = this.props;

    return (
      <li
        className="list"
        onClick={() => this.onListClicked(item)}
        style={listStyle}
      >
        <span className="list__text">{item.title}</span>
        <p className="list__count">{item.count}</p> 
      </li>
    )
  }
}

const List = connect(
  mapStateToProps,
  {getNotes, setView, setNotesTitle, setNotesListId}
)(ConnectedList);

export default List;