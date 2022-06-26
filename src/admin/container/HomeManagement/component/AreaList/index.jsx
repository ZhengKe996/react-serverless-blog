import { useState } from "react";
import { Button } from "antd";

import styles from "./arealist.module.scss";
import { parseJsonByString } from "../../../../../utils";
const listData = parseJsonByString(window.localStorage.homeData, []);

const AreaList = () => {
  const [list, setList] = useState(listData);
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

  const handleSaveBtnClick = () => {
    const listData = JSON.stringify(list);
    window.localStorage.homeData = listData;
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
      <Button
        type="primary"
        className={styles.save}
        onClick={handleSaveBtnClick}
      >
        保存区块配置
      </Button>
    </div>
  );
};

export default AreaList;
