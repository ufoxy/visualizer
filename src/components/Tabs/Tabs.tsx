import React from "react";
import Link from "next/link";
import styles from "../../../styles/components/Tabs/Tabs.module.scss";
import { useRouter } from "next/router";
import { RiToolsFill } from 'react-icons/ri';
import { RiRoadMapLine } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { AiOutlineLineChart } from 'react-icons/ai'

function Tabs() {

  const { query } = useRouter();

  return (
    <React.Fragment>
      <article className={styles.tabs_div}>
      <nav>
        <ul className={styles.nav_ul}>
          <li className={styles.li}>
           <RiToolsFill fontSize={20.5} />
            <Link href={`/equipamento/${query.name}?id=${query.id}`}>{query.name}</Link>
          </li>
          <li className={styles.li}>
           <RiRoadMapLine fontSize={20.5} />
            <Link href={`/equipamento/historico/${query.name}?id=${query.id}`}>Histórico</Link>
          </li>
          <li className={styles.li}>
           <AiOutlineLineChart fontSize={20.5} />
            <Link href={`/equipamento/historico/${query.name}?id=${query.id}`}>Estatísticas</Link>
          </li>
          <li className={styles.li}>
           <BiMessageSquareDetail fontSize={20.5} />
            <Link href={`/equipamento/historico/${query.name}?id=${query.id}`}>Detalhes</Link>
          </li>
        </ul>
      </nav>
        </article>
    </React.Fragment>
  );
}

export default Tabs;