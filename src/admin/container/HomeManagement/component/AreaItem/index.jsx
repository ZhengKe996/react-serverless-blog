import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Select } from "antd";
import styles from "./areaitem.module.scss";

const { Option } = Select;

const AreaItem = (props, ref) => {
  const { index, item, removeItemFromChildrenClick } = props;
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [schema, setSchema] = useState(item);

  useImperativeHandle(ref, () => {
    return {
      getSchema: () => schema,
    };
  });

  const showModal = () => {
    setIsModelVisible(true);
  };
  const handleModalOkClick = () => {
    setIsModelVisible(false);
  };
  const handleModalCancelClick = () => {
    setSchema(item);
    setIsModelVisible(false);
  };

  const handleSelectorChange = (value) => {
    const schema = {
      name: value,
      attributes: {},
      children: [],
    };

    setSchema(schema);
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
          value={schema.name}
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

export default forwardRef(AreaItem);
