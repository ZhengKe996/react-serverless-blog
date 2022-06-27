import styles from "./banner.module.scss";

const Banner = ({ schema }) => {
  const { attributes = {} } = schema;
  const {
    title,
    description,
    showSmallPic,
    smallPicUrl,
    backgroundUrl,
    backgroundHeight,
  } = attributes;
  const wrapperStyle = backgroundUrl
    ? { backgroundImage: `url('${backgroundUrl}')` }
    : {};

  backgroundHeight && (wrapperStyle.height = parseInt(backgroundHeight, 10));
  return (
    <div className="wrapper">
      <div className={styles.banner} style={wrapperStyle}>
        <div className={styles.info}>
          {showSmallPic && smallPicUrl ? (
            <img className={styles.avatar} src={smallPicUrl} alt="" />
          ) : null}
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// https://react-serverless-blog.oss-cn-hangzhou.aliyuncs.com/images/avatar.jpg
// https://react-serverless-blog.oss-cn-hangzhou.aliyuncs.com/images/bg.jpeg
