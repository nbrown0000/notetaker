const setUser = user => ({ type: "SET_USER", payload: user })
const setRoute = route => ({ type: "SET_ROUTE", payload: route })
const setView = view => ({ type: "SET_VIEW", payload: view })
const setWindow = window => ({ type: "SET_WINDOW", payload: window })
const setActiveList = activeList => ({ type: "SET_ACTIVE_LIST", payload: activeList })
const setLists = lists => ({ type: "SET_LISTS", payload: lists })
const setNotes = notes => ({ type: "SET_NOTES", payload: notes })
const setNotesTitle = list_id => ({ type: "SET_NOTES_TITLE", payload: list_id })
const setNotesListId = list_id => ({ type: "SET_NOTES_LIST_ID", payload: list_id })

const setOptions = options => {
  return {
    method: "POST",
    body: JSON.stringify(options),
    headers: { "Content-Type": "application/json" }
  }
}

const getLists = user_id => {
  return function(dispatch) {
    return fetch("http://localhost:3100/list/getlists/", setOptions({ user_id: user_id }))
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "SET_LISTS", payload: data });
      });
  }
}

const getNotes = list_id => {
  return function(dispatch) {
    return fetch("http://localhost:3100/note/getnotes/", setOptions({ list_id: list_id }))
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "SET_NOTES", payload: data })
        dispatch({ type: "SET_NOTES_TITLE", payload: list_id })
        dispatch({ type: "SET_NOTES_LIST_ID", payload: list_id })
      })
  }
}

// updates list title and refreshes lists and notes
const updateList = (list_id, title) => {
  return function(dispatch) {
    fetch("http://localhost:3100/list/updatelist/", setOptions({list_id: list_id, title: title }))
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "UPDATE_LIST", payload: data });
      })
  }
}

module.exports = {
  setUser,
  setRoute,
  setView,
  setWindow,
  setActiveList,
  setLists,
  setNotes,
  getLists,
  getNotes,
  setNotesTitle,
  setNotesListId,
  updateList
}