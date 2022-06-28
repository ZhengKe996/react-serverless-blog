import { useCallback } from "react";
import { Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.scss";

import { parseJsonByString } from "../../../utils";
import {
  getChangeSchemaAction,
  getChangePageAttributeAction,
} from "../../store/action";

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  };
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value));
  };
  return { changeSchema, changePageAttribute, schema };
};

const BasicSetting = () => {
  const { changeSchema, changePageAttribute, schema = {} } = useStore();
  const { attributes = {} } = schema;
  const { title = "" } = attributes;
  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema);
  };

  const handleResetBtnClick = () => {
    changeSchema(parseJsonByString(window.localStorage.schema, {}));
  };

  const handleTitleChange = useCallback(
    (e) => {
      changePageAttribute("title", e.target.value);
    },
    [changePageAttribute]
  );

  return (
    <>
      <div className={styles.row}>
        <div className={styles.title}>页面标题:</div>
        <div className={styles.content}>
          <Input
            value={title}
            onChange={(e) => {
              handleTitleChange(e);
            }}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>
          保存基础配置
        </Button>

        <Button
          type="primary"
          className={styles.reset}
          onClick={handleResetBtnClick}
        >
          重置基础配置
        </Button>
      </div>
    </>
  );
};

export default BasicSetting;
