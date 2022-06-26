import { useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "antd";
import styles from "./page-setting.module.scss";

const { TextArea } = Input;

const PageSetting = (props, ref) => {
  const [title, setTitle] = useState(window.localStorage.title || "");
  const [description, setDescription] = useState(
    window.localStorage.description || ""
  );
  useImperativeHandle(ref, () => {
    return {
      title: title,
      description: description,
    };
  });
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    ref.current.title = e.target.value;
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    ref.current.description = e.target.value;
  };

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder="请输入页面标题"
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder="请输入页面描述"
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default forwardRef(PageSetting);
