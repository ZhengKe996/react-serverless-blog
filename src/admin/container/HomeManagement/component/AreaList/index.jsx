import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";
import {
  getAddPageChildrenAction,
  getChangePageChildrenPositionAction,
} from "../../../../store/action.js";

const useStore = () => {
  const dispatch = useDispatch();
  const children = useSelector((state) => state.common.schema?.children) || [];
  const changeSchema = () => {
    dispatch(getAddPageChildrenAction());
  };
  const onSortEnd = (activeIndex, overIndex) => {
    dispatch(getChangePageChildrenPositionAction(activeIndex, overIndex));
  };
  return { children, changeSchema, onSortEnd };
};

const SortableList = (props) => {
  const { children, onSortEnd } = props;

  // 拖拽结束后的操作
  function dragEndEvent({ active, over }) {
    const activeIndex = children.indexOf(active.id);
    const overIndex = children.indexOf(over.id);
    onSortEnd(activeIndex, overIndex);
  }
  return (
    <DndContext onDragEnd={dragEndEvent}>
      <SortableContext items={children}>
        <ul className={styles.list}>
          {children.map((item, index) => (
            <AreaItem id={item} index={index} key={index} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

const AreaList = () => {
  const { children, changeSchema, onSortEnd } = useStore();
  const addPageChildrenClick = () => {
    changeSchema();
  };

  return (
    <div>
      <SortableList children={children} onSortEnd={onSortEnd} />
      <Button type="primary" ghost onClick={addPageChildrenClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default AreaList;
