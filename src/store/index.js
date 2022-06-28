import { legacy_createStore as createStore, combineReducers } from "redux";
import commonReducer from "../admin/store/reducer";

const reducer = combineReducers({
  common: commonReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
