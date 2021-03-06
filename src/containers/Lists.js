import React, { useEffect } from 'react'
import "./Lists.css";
import List from "../components/List";
import { connect } from "react-redux";
import { getLists, getNotes, setNotesListId } from "../actions"

const mapStateToProps = state => {
  return {
    user: state.user,
    lists: state.lists,
    notesListId: state.notesListId
  };
}

const mapDispatchToProps = {
  setNotesListId, getLists, getNotes
}

function ConnectedLists(props) {
  const { user, lists, getLists, getNotes, notesListId, setNotesListId } = props;

  useEffect(() => {
    getLists(user.user_id)
  }, [user.user_id, getLists])

  useEffect(() => {
    if(lists.length === 0) {
      setNotesListId(null)
    }
  }, [setNotesListId, lists.length])

  useEffect(() => {
    if(lists.length > 0 && !notesListId) {
      getNotes(lists[0].list_id)
    }
  }, [lists, getNotes, notesListId])

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

const Lists = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLists);

export default Lists;