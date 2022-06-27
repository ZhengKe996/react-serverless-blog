import { useState } from "react";
import { Button, Modal, Select } from "antd";
import styles from "./areaitem.module.scss";

const { Option } = Select;

const AreaItem = (props) => {
  const { index, item, removeItemFromChildrenClick, changeChildrenItem } =
    props;
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [schema, setSchema] = useState(item);
  const [temp, setTemp] = useState(item);
  const showModal = () => {
    setIsModelVisible(true);
  };
  const handleModalOkClick = () => {
    setIsModelVisible(false);
    changeChildrenItem(index, temp);
  };
  const handleModalCancelClick = () => {
    setTemp(item);
    setIsModelVisible(false);
  };

  const handleSelectorChange = (value) => {
    const schema = {
      name: value,
      attributes: {},
      children: [],
    };

    setTemp(schema);
  };
  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>
        当前区块内容为空
      </span>
      <span className={styles.delete}>
        <Button
          onClick={() => removeItemFromChildrenClick(index)}
          size="small"
          type="dashed"
          danger
        >
          删除
        </Button>
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
          <Option value="List">List 组件</Option>
          <Option value="Footer">Footer 组件</Option>
        </Select>
      </Modal>
    </li>
  );
};

export default AreaItem;
