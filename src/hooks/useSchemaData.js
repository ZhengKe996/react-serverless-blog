import { useSelector, useDispatch } from "react-redux";
import {
  getChangeSchemaAction,
  getChangePageAttributeAction,
  getChangePageChildrenAction,
  getDeletePageChildrenAction,
  getAddPageChildrenAction,
  getChangePageChildrenPositionAction,
} from "../admin/store/action";

const useSchemaData = ({ index } = {}) => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const pageChild = schema.children?.[index] || {};
  const children = schema?.children || [];

  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  };
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value));
  };
  const changePageChild = (temp) => {
    dispatch(getChangePageChildrenAction(index, temp));
  };
  const removePageChild = () => {
    dispatch(getDeletePageChildrenAction(index));
  };
  const changeChildrenSchema = () => {
    dispatch(getAddPageChildrenAction());
  };
  const onSortEnd = (activeIndex, overIndex) => {
    dispatch(getChangePageChildrenPositionAction(activeIndex, overIndex));
  };

  return {
    changeSchema,
    changePageAttribute,
    changePageChild,
    removePageChild,
    changeChildrenSchema,
    onSortEnd,
    schema,
    pageChild,
    children,
  };
};
export default useSchemaData;
