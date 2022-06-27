import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "./arealist.module.scss";
import AreaItem from "../AreaItem";
import { getAddPageChildrenAction } from "../../store/action";

const useStore = () => {
  const dispatch = useDispatch();
  const children =
    useSelector((state) => state.homeManagement.schema?.children) || [];
  const changeSchema = () => {
    dispatch(getAddPageChildrenAction());
  };

  return { children, changeSchema };
};

const AreaList = () => {
  const { children, changeSchema } = useStore();
  const addPageChildrenClick = () => {
    changeSchema();
  };

  return (
    <div>
      <ul className={styles.list}>
        {children.map((item, index) => (
          <AreaItem key={index} index={index} item={item} />
        ))}
      </ul>
      <Button type="primary" ghost onClick={addPageChildrenClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default AreaList;
