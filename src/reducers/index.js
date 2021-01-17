export default (state, action) => {

  switch(action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };

    case "SET_ROUTE":
      return {
        ...state,
        route: action.payload
      };

    case "SET_VIEW":
      return {
        ...state,
        view: action.payload
      };

    case "SET_WINDOW":
      return {
        ...state,
        window: action.payload
      };

    case "SET_ACTIVE_LIST":
      return {
        ...state,
        activeList: action.payload
      };

    case "SET_LISTS":
      return {
        ...state,
        lists: action.payload
      };
    
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload
      };

    case "SET_NOTES_TITLE":
      const title = state.lists.reduce((acc,cur) => {
        if(cur.list_id === action.payload) return acc + cur.title
        return acc
      }, "")

      return {
        ...state,
        notesTitle: title
      };

    case "SET_NOTES_LIST_ID":
      return {
        ...state,
        notesListId: action.payload
      };
      
    case 'UPDATE_LIST':
      const updatedLists = state.lists.map(list => {
        if(list.list_id === action.payload.list_id) {
          return action.payload
        }
        else {
          return list
        }
      })
      
      return {
        ...state,
        lists: updatedLists
      }



    default:
      return state;
  }
};