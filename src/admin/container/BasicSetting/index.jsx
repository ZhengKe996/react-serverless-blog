import { useCallback } from "react";
import { Button, Input, message } from "antd";
import useSchemaData from "../../../hooks/useSchemaData";
import styles from "./style.module.scss";
import { parseJsonByString } from "../../../utils";
import service from "../../../service";

const BasicSetting = () => {
  const { changeSchema, changePageAttribute, schema = {} } = useSchemaData();

  const { attributes = {} } = schema;
  const { title = "" } = attributes;
  const handleSaveBtnClick = () => {
    service
      .post("/api/schema/save", {
        schema: JSON.stringify(schema),
      })
      .then((res) => {
        const { success = false } = res;
        (success && message.success("保存基础配置成功")) ||
          message.error("保存基础配置失败, 请稍后再试");
      });
  };

  const handleResetBtnClick = () => {
    service.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res;
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
