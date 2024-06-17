import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as styles from "./NavBarItem.module.css";

interface NavbarItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavBarItem: FC<NavbarItemProps> = ({ href, label, isActive }) => {
  return (
    <div className={styles.container}>
      <Link to={href} className={styles.link}>
        <div
          className={`${isActive ? styles.active : ""} ${styles.textContainer}`}
        >
          <span className={styles.text}>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default NavBarItem;
