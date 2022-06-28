import styles from "./note.module.scss";
const Notes = ({ schema }) => {
  const { children = {} } = schema;
  return (
    <div className="wrapper">
      <ul className={styles.list}>
        {children.map((item, index) => {
          const { attributes = {} } = item;
          const { link, title, description, imageUrl } = attributes;
          return (
            <li className={styles.item} key={index}>
              <a className={styles.link} href={link}>
                <img className={styles.img} src={imageUrl} alt={title} />
                <h4 className={styles.title}>{title || "Title is Null"}</h4>
                <p className={styles.desc}>
                  {description || "Description is Null"}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notes;
