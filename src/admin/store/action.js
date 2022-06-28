import {
  CHANGE_SCHEMA,
  ADD_PAGE_CHILDREN,
  CHANGE_PAGE_CHILDREN,
  DELETE_PAGE_CHILDREN,
  CHANGE_PAGE_CHILDREN_POSITION,
  CHANGE_PAGE_ATTRIBUTE,
} from "./constant";

export const getChangeSchemaAction = (schema) => {
  return {
    type: CHANGE_SCHEMA,
    value: schema,
  };
};

export const getAddPageChildrenAction = () => {
  return {
    type: ADD_PAGE_CHILDREN,
    value: {},
  };
};

export const getChangePageChildrenAction = (index, value) => {
  return {
    type: CHANGE_PAGE_CHILDREN,
    value: value,
    index: index,
  };
};
export const getDeletePageChildrenAction = (index) => {
  return {
    type: DELETE_PAGE_CHILDREN,
    index: index,
  };
};

export const getChangePageChildrenPositionAction = (oldIndex, newIndex) => {
  return { type: CHANGE_PAGE_CHILDREN_POSITION, oldIndex, newIndex };
};

export const getChangePageAttributeAction = (key, value) => {
  return {
    type: CHANGE_PAGE_ATTRIBUTE,
    key: key,
    value: value,
  };
};
