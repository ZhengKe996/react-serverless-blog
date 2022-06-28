import { Button } from "antd";
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
    window.localStorage.schema = JSON.stringify(schema);
  };

  const handleResetBtnClick = () => {
    changeSchema(parseJsonByString(window.localStorage.schema, {}));
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
