// import { Button } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import styles from "./style.module.scss";
// import AreaList from "./component/AreaList";
// import { parseJsonByString } from "../../../utils";
// import { getChangeSchemaAction } from "./store/action";

// const useStore = () => {
//   const dispatch = useDispatch();
//   const schema = useSelector((state) => state.homeManagement.schema);
//   const changeSchema = (schema) => {
//     dispatch(getChangeSchemaAction(schema));
//   };

//   return { changeSchema, schema };
// };

// const BasicSetting = () => {
//   const { changeSchema, schema } = useStore();

//   const handleSaveBtnClick = () => {
//     window.localStorage.schema = JSON.stringify(schema);
//   };

//   const handleResetBtnClick = () => {
//     changeSchema(parseJsonByString(window.localStorage.schema, {}));
//   };

//   return (
//     <>
//       <AreaList children={schema?.children || []} />

//       <div className={styles.buttons}>
//         <Button type="primary" onClick={handleSaveBtnClick}>
//           保存基础配置
//         </Button>

//         <Button
//           type="primary"
//           className={styles.reset}
//           onClick={handleResetBtnClick}
//         >
//           重置基础配置
//         </Button>
//       </div>
//     </>
//   );
// };

// export default BasicSetting;
const BasicSetting = () => {
  return <div>BasicSetting</div>;
};

export default BasicSetting;
