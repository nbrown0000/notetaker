import React, { useEffect } from 'react'
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

function ConnectedLists(props) {
  useEffect(() => {
    props.getLists(props.user.user_id)
  }, [props])

  const compareLists = (a,b) => {
    if(a.list_id < b.list_id) { return -1; }
    if(a.list_id > b.list_id) { return 1; }
    return 0
  }

    return (
    <section className="lists" >
         <ul className="lists__active">
           {
           props.lists.length === 0 ? <></> :
           props.lists.sort(compareLists).map((item,i) => {
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

const Lists = connect(mapStateToProps, {getLists, getNotes})(ConnectedLists);

export default Lists;