import { produce } from "immer";
import {
  CHANGE_SCHEMA,
  ADD_PAGE_CHILDREN,
  CHANGE_PAGE_CHILDREN,
  DELETE_PAGE_CHILDREN,
} from "./constant";
import { parseJsonByString } from "../../../../utils";

const initialSchema = parseJsonByString(window.localStorage.schema, {
  name: "Page",
  attributes: {},
  children: [],
});

const defaultState = {
  schema: initialSchema,
};

const reducer = (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_SCHEMA:
        draft.schema = action.value;
        break;
      case ADD_PAGE_CHILDREN:
        draft.schema.children.push(action.value);
        break;
      case CHANGE_PAGE_CHILDREN:
        draft.schema.children.splice(action.index, 1, action.value);
        break;
      case DELETE_PAGE_CHILDREN:
        draft.schema.children.splice(action.index, 1);
        break;
      default:
        break;
    }
  });

export default reducer;
