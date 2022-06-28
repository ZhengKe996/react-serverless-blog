import { Input, Switch } from "antd";
import commonStyles from "../style.module.scss";
const { TextArea } = Input;

const Banner = (props) => {
  const { attributes = {}, changeAttributes } = props;
  const {
    title,
    description,
    showSmallPic,
    smallPicUrl,
    backgroundUrl,
    backgroundHeight,
  } = attributes;

  const handleShowSmallPicClick = (checked) => {
    changeAttributes({ showSmallPic: checked });
    if (!checked) {
      changeAttributes({ showSmallPic: checked, smallPicUrl: null });
    }
  };

  return (
    <div className={commonStyles["wrapper"]}>
      <div className={commonStyles["attributes-row"]}>
        <span className={commonStyles["attributes-label"]}>页面标题</span>
        <Input
          value={title}
          className={commonStyles["attributes-content"]}
          placeholder="请输入页面标题"
          onChange={(e) => {
            changeAttributes({ title: e.target.value });
          }}
        />
      </div>

      <div className={commonStyles["attributes-row"]}>
        <span className={commonStyles["attributes-label"]}>页面描述</span>
        <TextArea
          value={description}
          className={commonStyles["attributes-content"]}
          rows={2}
          placeholder="请输入页面描述"
          onChange={(e) => {
            changeAttributes({ description: e.target.value });
          }}
        />
      </div>

      <div className={commonStyles["attributes-row"]}>
        <span className={commonStyles["attributes-label"]}>展示小图</span>
        <Switch
          checked={showSmallPic}
          onChange={(checked) => {
            handleShowSmallPicClick(checked);
          }}
        />
      </div>

      {showSmallPic ? (
        <div className={commonStyles["attributes-row"]}>
          <span className={commonStyles["attributes-label"]}>小图链接</span>
          <Input
            value={smallPicUrl}
            className={commonStyles["attributes-content"]}
            rows={2}
            placeholder="请输入小图的 URL 地址"
            onChange={(e) => {
              changeAttributes({ smallPicUrl: e.target.value });
            }}
          />
        </div>
      ) : null}

      <div className={commonStyles["attributes-row"]}>
        <span className={commonStyles["attributes-label"]}>背景链接</span>
        <Input
          value={backgroundUrl}
          className={commonStyles["attributes-content"]}
          rows={2}
          placeholder="请输入背景的 URL 地址"
          onChange={(e) => {
            changeAttributes({ backgroundUrl: e.target.value });
          }}
        />
      </div>

      <div className={commonStyles["attributes-row"]}>
        <span className={commonStyles["attributes-label"]}>背景高度</span>
        <Input
          type="number"
          value={backgroundHeight}
          className={commonStyles["attributes-content"]}
          rows={2}
          placeholder="请输入背景高度的像素值"
          onChange={(e) => {
            changeAttributes({ backgroundHeight: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
