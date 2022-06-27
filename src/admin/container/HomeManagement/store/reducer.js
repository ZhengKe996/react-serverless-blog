import { produce } from "immer";
import { CHANGE_SCHEMA } from "./constant";
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
    console.log(action);
    switch (action.type) {
      case CHANGE_SCHEMA:
        draft.schema = action.value;
        break;
      default:
        break;
    }
  });

export default reducer;
