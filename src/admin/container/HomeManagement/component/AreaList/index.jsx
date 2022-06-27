import {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useMemo,
} from "react";
import { Button } from "antd";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";

let refs = [];

const AreaList = (props, ref) => {
  const [children, setChildren] = useState(props.children);

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
      resetSchema: () => {
        setChildren(props.children);
        children.forEach((item, index) => {
          refs[index].current.resetSchema();
        });
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
        {children.map((item, index) => (
          <AreaItem
            key={index}
            index={index}
            item={item}
            ref={refs[index]}
            removeItemFromChildrenClick={removeItemFromChildrenClick}
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
