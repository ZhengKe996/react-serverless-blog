import { legacy_createStore as createStore, combineReducers } from "redux";
import homeManagementReducer from "../admin/container/HomeManagement/store/reducer";

const reducer = combineReducers({
  homeManagement: homeManagementReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
