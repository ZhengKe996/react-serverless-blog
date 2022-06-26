import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a className={styles.link} href="/admin.html">
            Admin Page
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
