import {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useMemo,
  useEffect,
} from "react";
import { ReactSortable } from "react-sortablejs";
import { Button } from "antd";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";

let refs = [];

const AreaList = (props, ref) => {
  const [children, setChildren] = useState(props.children);
  useEffect(() => {
    setChildren(props.children);
  }, [props.children]);

  useMemo(() => {
    refs = children.map((item) => createRef());
  }, [children]);

  useImperativeHandle(ref, () => {
    return {
      getSchema: () => {
        const schema = [];
        children.forEach((item, index) => {
          schema.push(refs[index].current.getSchema());
        });
        return schema;
      },
    };
  });

  const addItemChildrenClick = () => {
    const newChildren = [...children];
    newChildren.push({});
    setChildren(newChildren);
  };

  const removeItemFromChildrenClick = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  return (
    <div>
      <ul className={styles.list}>
        <ReactSortable list={children} setList={setChildren}>
          {children.map((item, index) => (
            <AreaItem
              key={index}
              index={index}
              item={item}
              ref={refs[index]}
              removeItemFromChildrenClick={removeItemFromChildrenClick}
            />
          ))}
        </ReactSortable>
      </ul>
      <Button type="primary" ghost onClick={addItemChildrenClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
