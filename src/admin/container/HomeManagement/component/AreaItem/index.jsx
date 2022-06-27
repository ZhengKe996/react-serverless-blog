import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button, Modal, Select } from "antd";
import {
  getChangePageChildrenAction,
  getDeletePageChildrenAction,
} from "../../store/action.js";
import styles from "./areaitem.module.scss";

const { Option } = Select;

const useStore = (index) => {
  const dispatch = useDispatch();
  const pageChild = useSelector(
    (state) => state.homeManagement.schema.children?.[index] || {}
  );
  const changePageChild = (temp) => {
    dispatch(getChangePageChildrenAction(index, temp));
  };
  const removePageChild = () => {
    dispatch(getDeletePageChildrenAction(index));
  };
  return { pageChild, changePageChild, removePageChild };
};

const AreaItem = (props) => {
  const { index, id } = props;
  const { pageChild, changePageChild, removePageChild } = useStore(index);
  const { setNodeRef, listeners, transform } = useSortable({ id });

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [temp, setTemp] = useState(pageChild);

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const showModal = () => {
    console.log("---");
    setIsModelVisible(true);
  };

  const handleModalOkClick = () => {
    setIsModelVisible(false);
    changePageChild(temp);
  };

  const handleModalCancelClick = () => {
    setIsModelVisible(false);
    setTemp(pageChild);
  };

  const handleSelectorChange = (value) => {
    setTemp({
      name: value,
      attributes: {},
      children: [],
    });
  };

  const removePageChildrenClick = () => {
    removePageChild();
  };

  return (
    <li className={styles.item} style={style}>
      <span className={styles.content} onClick={showModal}>
        {pageChild.name ? `${pageChild.name} 组件` : "当前区块内容为空"}
      </span>
      <span className={styles.delete}>
        <Button
          onClick={removePageChildrenClick}
          size="small"
          type="dashed"
          danger
        >
          删除
        </Button>
      </span>

      <span className="iconfont" ref={setNodeRef} {...listeners}>
        &#xe62d;
      </span>
      <Modal
        title="选择组件"
        visible={isModelVisible}
        onOk={handleModalOkClick}
        onCancel={handleModalCancelClick}
      >
        <Select
          value={temp.name}
          className={styles.selector}
          style={{ width: "100%" }}
          onChange={handleSelectorChange}
        >
          <Option value="Banner">Banner 组件</Option>
          <Option value="Notes">Notes 组件</Option>
          <Option value="Footer">Footer 组件</Option>
        </Select>
      </Modal>
    </li>
  );
};

export default AreaItem;
