import { Button, message } from "antd";

import useSchemaData from "../../../hooks/useSchemaData";
import service from "../../../service";
import styles from "./style.module.scss";
import AreaList from "./component/AreaList";
import { parseJsonByString } from "../../../utils";

const HomeManagement = () => {
  const { changeSchema, schema = {} } = useSchemaData();

  const handleSaveBtnClick = () => {
    service
      .post("/api/schema/save", {
        schema: JSON.stringify(schema),
      })
      .then((res) => {
        const { success = false } = res;

        (success && message.success("保存区块配置成功")) ||
          message.error("保存区块配置失败, 请稍后再试");
      });
  };

  const handleResetBtnClick = () => {
    service.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res;
      data && changeSchema(parseJsonByString(data.schema, {}));
      (success && message.success("重置区块配置成功")) ||
        message.error("重置区块配置失败, 请稍后再试");
    });
  };

  return (
    <>
      <AreaList children={schema?.children || []} />

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>
          保存区块配置
        </Button>

        <Button
          type="primary"
          className={styles.reset}
          onClick={handleResetBtnClick}
        >
          重置区块配置
        </Button>
      </div>
    </>
  );
};

export default HomeManagement;
