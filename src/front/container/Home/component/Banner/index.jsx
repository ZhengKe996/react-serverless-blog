import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <img
          className={styles.avatar}
          src={
            "https://react-serverless-blog.oss-cn-hangzhou.aliyuncs.com/images/avatar.jpg"
          }
          alt=""
        />
        <div className={styles.title}>This is the title area</div>
        <div className={styles.description}>This is the title description</div>
      </div>
    </div>
  );
};

export default Banner;
