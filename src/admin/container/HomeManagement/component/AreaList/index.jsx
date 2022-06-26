import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "antd";

import styles from "./arealist.module.scss";
import { parseJsonByString } from "../../../../../utils";
const listData = parseJsonByString(window.localStorage.homeData, []);

const AreaList = (props, ref) => {
  const [list, setList] = useState(listData);
  useImperativeHandle(ref, () => {
    return { list: list };
  });

  const handleAddBtnClick = () => {
    const newList = [...list];
    newList.push({});
    setList(newList);
  };

  const handleDeleteBtnClick = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <div>
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.content}>当前区块内容为空</span>
            <span className={styles.delete}>
              <Button
                onClick={() => handleDeleteBtnClick(index)}
                size="small"
                type="dashed"
                danger
              >
                删除
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <Button type="primary" ghost onClick={handleAddBtnClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
