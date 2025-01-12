import React, { ReactNode } from "react";
import styles from "../../../styles/components/Blue-label/Blue-label.module.scss";

type BlueLabelProps = { children: ReactNode };
const BlueLabel: React.FC<BlueLabelProps> = ({ children }) => {
  return <span className={styles.blue_label}> {children} </span>;
};

export default BlueLabel;
