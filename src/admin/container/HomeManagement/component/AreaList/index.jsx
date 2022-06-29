import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import useSchemaData from "../../../../../hooks/useSchemaData";
import { Button } from "antd";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";

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
  const { children, changeChildrenSchema, onSortEnd } = useSchemaData();
  const addPageChildrenClick = () => {
    changeChildrenSchema();
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
