import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";

const initialState = {
  view: 'lists',
  route: 'login',
  user: '',
  lists: [],
  notes: []
  // route: 'main',
  // view: 'lists',
  // user: { user_id: 37, username: "johnny5" },
  // window: { width: 0, height: 0 },
  // lists: [],
  // activeList: '',
  // notes: []
}

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk)),
);

export default store;