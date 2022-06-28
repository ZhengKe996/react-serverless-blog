import { Button, Input } from "antd";

import commonStyles from "../style.module.scss";

const Notes = (props) => {
  const { children = [], changeChildren } = props;
  const addItemToChildren = () => {
    const newChildren = [...children];
    newChildren.push({
      name: "Item",
      attributes: {
        title: "",
        description: "",
        imageUrl: "",
        link: "",
      },
      children: [],
    });
    changeChildren(newChildren);
  };

  const deleteItemFormChildren = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    changeChildren(newChildren);
  };

  const changeChildrenItem = (index, key, value) => {
    const originItem = children[index];
    const item = { ...originItem };
    item.attributes[key] = value;
    const newChildren = [...children];
    newChildren.splice(index, 1, item);
    changeChildren(newChildren);
  };
  return (
    <div className={commonStyles["wrapper"]}>
      <Button
        type="primary"
        className={commonStyles["button"]}
        onClick={addItemToChildren}
      >
        新增列表项
      </Button>
      {children.map(
        ({ attributes: { title, description, imageUrl, link } }, index) => (
          <div className={commonStyles["area"]} key={index}>
            <div
              className={commonStyles["area-delete"]}
              onClick={() => deleteItemFormChildren(index)}
            >
              X
            </div>
            <div className={commonStyles["area-row"]}>
              <span className={commonStyles["area-label"]}>标题</span>
              <Input
                value={title}
                className={commonStyles["area-content"]}
                placeholder="请输入标题"
                onChange={(e) => {
                  changeChildrenItem(index, "title", e.target.value);
                }}
              />
            </div>
            <div className={commonStyles["area-row"]}>
              <span className={commonStyles["area-label"]}>描述</span>
              <Input
                value={description}
                className={commonStyles["area-content"]}
                placeholder="请输入描述"
                onChange={(e) => {
                  changeChildrenItem(index, "description", e.target.value);
                }}
              />
            </div>
            <div className={commonStyles["area-row"]}>
              <span className={commonStyles["area-label"]}>图片</span>
              <Input
                value={imageUrl}
                className={commonStyles["area-content"]}
                placeholder="请输入图片的 URL"
                onChange={(e) => {
                  changeChildrenItem(index, "imageUrl", e.target.value);
                }}
              />
            </div>
            <div className={commonStyles["area-row"]}>
              <span className={commonStyles["area-label"]}>链接</span>
              <Input
                value={link}
                className={commonStyles["area-content"]}
                placeholder="请输入跳转链接"
                onChange={(e) => {
                  changeChildrenItem(index, "link", e.target.value);
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Notes;
