import styles from "./banner.module.scss";
import { parseJsonByString } from "../../../../../utils";
const schema = parseJsonByString(window.localStorage.schema, {});
const bannerSchema = schema?.children?.[0] || {};

const Banner = () => {
  const title = bannerSchema?.attributes?.title || "这是一个小站";
  const description =
    bannerSchema?.attributes?.description || "这是一个小段描述";

  return (
    <div className="wrapper">
      <div className={styles.banner}>
        <div className={styles.info}>
          <img
            className={styles.avatar}
            src={
              "https://react-serverless-blog.oss-cn-hangzhou.aliyuncs.com/images/avatar.jpg"
            }
            alt=""
          />
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
