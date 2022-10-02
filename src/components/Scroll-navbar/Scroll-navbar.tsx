import Link from "next/link";
import styles from "../../../styles/components/Scroll-navbar/Scroll-navbar.module.scss";

const styleTest = {
  width: "100%",
  padding: "50px 0",
};

function ScrollNavBar({ equipment, path }: any) {
  return (
    <div className={styles.scroll_navbar}>
      <ul className={styles.ul}>
        {equipment.map((e: any) => (
          <Link
            key={e.id}
            href={`${path}${e.name}?id=${e.id}`}
            prefetch={false}
          >
            <li key={e.id} className={styles.li}>
              {e.name}
            </li>
          </Link>
        ))}
        <li style={styleTest}></li>
        <li style={styleTest}></li>
      </ul>
    </div>
  );
}

export default ScrollNavBar;
