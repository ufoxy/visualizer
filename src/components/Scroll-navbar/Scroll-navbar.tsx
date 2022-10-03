import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/components/Scroll-navbar/Scroll-navbar.module.scss";

const styleTest = {
  width: "100%",
  padding: "50px 0",
};

function ScrollNavBar({ equipment, path }: any) {
  const { query } = useRouter();
  return (
    <div className={styles.scroll_navbar}>
      <ul className={styles.ul}>
        {equipment.map((e: any) => {
          const name = e.name;
          const activate = name === query.name;
          return (
            <Link
              key={e.id}
              href={`${path}${e.name}?id=${e.id}`}
              prefetch={false}
            >
              <li
                key={e.id}
                className={styles.li}
                style={
                  activate
                    ? {
                        borderLeft: "5px solid #3E98C7",
                        transition: "all 100ms",
                      }
                    : {}
                }
              >
                {e.name}
              </li>
            </Link>
          );
        })}
        <li style={styleTest}></li>
        <li style={styleTest}></li>
      </ul>
    </div>
}

export default ScrollNavBar;
