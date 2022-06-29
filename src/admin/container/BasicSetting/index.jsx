import { useCallback } from "react";
import axios from "axios";
import { Button, Input, message } from "antd";
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
    const token = window.localStorage._authing_token;

    axios
      .post(
        "/api/schema/save",
        {
          schema: JSON.stringify(schema),
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        const { success = false } = res.data;
        (success && message.success("保存基础配置成功")) ||
          message.error("保存基础配置失败, 请稍后再试");
      });
  };

  const handleResetBtnClick = () => {
    axios.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
      (success && message.success("重置基础配置成功")) ||
        message.error("重置基础配置失败, 请稍后再试");
    });
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
