import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MenuLateralContext from "../../common/contexts/Menu-lateral";
import styles from "../../../styles/components/Scroll-navbar/Scroll-navbar.module.scss";

const styleTest = {
  width: "100%",
  padding: "50px 0",
};

function ScrollNavBar() {
  const { equipment, filteredEquipment, searchFilter, path }: any =
    useContext(MenuLateralContext);
  const { query } = useRouter();

  const [equip, setEquip] = useState([]);

  useEffect(() => {
    searchFilter("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEquip(equipment);
    if (filteredEquipment == undefined || null) {
      setEquip(equipment);
    } else {
      setEquip(filteredEquipment);
    }
  }, [equipment, filteredEquipment]);

  return (
    <div className={styles.scroll_navbar}>
      <ul className={styles.ul}>
        {equip.map((e: any) => {
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
                        borderLeft: "5px solid rgb(59, 186, 255)",
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
  );
}

export default ScrollNavBar;
