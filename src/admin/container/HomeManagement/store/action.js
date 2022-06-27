import { CHANGE_SCHEMA } from "./constant";

export const getChangeSchemaAction = (schema) => {
  return {
    type: CHANGE_SCHEMA,
    value: schema,
  };
};
