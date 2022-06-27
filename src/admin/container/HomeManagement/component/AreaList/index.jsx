import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "antd";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";
const AreaList = (props, ref) => {
  const [list, setList] = useState(props.children);

  useImperativeHandle(ref, () => {
    return { children: list };
  });

  const addItemChildrenClick = () => {
    const newList = [...list];
    newList.push({});
    setList(newList);
  };

  const removeItemFromChildrenClick = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const changeChildrenItem = (index, child) => {
    const newList = [...list];
    newList.splice(index, 1, child);
    setList(newList);
  };

  return (
    <div>
      <ul className={styles.list}>
        {list.map((item, index) => (
          <AreaItem
            key={index}
            index={index}
            item={item}
            removeItemFromChildrenClick={removeItemFromChildrenClick}
            changeChildrenItem={changeChildrenItem}
          />
        ))}
      </ul>
      <Button type="primary" ghost onClick={addItemChildrenClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
