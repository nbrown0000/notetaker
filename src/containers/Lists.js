import React, { Component } from 'react'
import "./Lists.css";
import List from "../components/List";
import { connect } from "react-redux";
import { getLists, getNotes } from "../actions"

const mapStateToProps = state => {
  return {
    user: state.user,
    lists: state.lists
  };
}

class ConnectedLists extends Component {

  async componentDidMount() {
    await this.props.getLists(this.props.user.user_id);
    this.props.getNotes(this.props.lists[0].list_id)
  }

  compareLists = (a,b) => {
    if(a.list_id < b.list_id) { return -1; }
    if(a.list_id > b.list_id) { return 1; }
    return 0
  }

  render() {
    return (
    <section className="lists" >
         <ul className="lists__active">
           {
           this.props.lists.length === 0 ? <></> :
           this.props.lists.sort(this.compareLists).map((item,i) => {
               return (
                 <List
                   item={item}
                   key={i}
                 />
               )
             })
           }
         </ul>
       </section>
    )
  }
    
}

const Lists = connect(mapStateToProps, {getLists, getNotes})(ConnectedLists);

export default Lists;