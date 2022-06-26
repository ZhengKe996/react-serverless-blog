import styles from "./banner.module.scss";
import AvatarImages from "../../../../assets/avatar.jpg";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <img className={styles.avatar} src={AvatarImages} alt="" />
        <div className={styles.title}>This is the title area</div>
        <div className={styles.description}>This is the title description</div>
      </div>
    </div>
  );
};

export default Banner;
