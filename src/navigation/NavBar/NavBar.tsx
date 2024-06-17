import React, { FC, useEffect, useState } from "react";
import NavBarItem from "../NavBarItem/NavBarItem";
import * as styles from "./NavBar.module.css";
import { useLocation } from "react-router-dom";

const NavBar: FC = () => {
  const [url, setUrl] = useState<string>();

  //url set every time location changes to get active state
  const location = useLocation(); // once ready it returns the 'window.location' object
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <nav className="container">
      <div className={styles.headline}>
        <h1>ToDo List Demo</h1>
      </div>

      <div className={styles.list}>
        <div className={styles.listElement}>
          <NavBarItem href="/" label={"Home"} isActive={url === "/"} />
        </div>
        <div className={styles.divider}></div>
        <div className={styles.listElement}>
          <NavBarItem
            href="/todos"
            label={"Todos"}
            isActive={url?.includes("/todos") ?? false}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
