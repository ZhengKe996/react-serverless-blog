import { Button, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.scss";
import AreaList from "./component/AreaList";
import { parseJsonByString } from "../../../utils";
import { getChangeSchemaAction } from "../../store/action.js";

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema);
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  };

  return { changeSchema, schema };
};

const HomeManagement = () => {
  const { changeSchema, schema } = useStore();

  const handleSaveBtnClick = () => {
    const token = window.localStorage._authing_token;
    axios
      .post(
        "/api/schema/save",
        {
          schema: JSON.stringify(schema),
        },
        { headers: { token } }
      )
      .then((res) => {
        const { success = false } = res.data;
        (success && message.success("保存区块配置成功")) ||
          message.error("保存区块配置失败, 请稍后再试");
      });
  };

  const handleResetBtnClick = () => {
    axios.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res.data;
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
